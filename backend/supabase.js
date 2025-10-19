const { createClient } = require("@supabase/supabase-js");
const config = require("./config");

const supabase = createClient(config.supabase.url, config.supabase.anonKey);

async function salvarPlanoAula(professorId, dadosInput, planoGerado) {
  try {
    const { data, error } = await supabase
      .from("planos_aula")
      .insert({
        professor_id: professorId,
        disciplina: dadosInput.disciplina,
        ano_escolar: dadosInput.ano_escolar,
        tema: dadosInput.tema,
        objetivo_principal: dadosInput.objetivo_principal,
        duracao_minutos: dadosInput.duracao_minutos,
        nivel_conhecimento: dadosInput.nivel_conhecimento,
        materiais_disponiveis: dadosInput.materiais_disponiveis,
        tipo_atividade: dadosInput.tipo_atividade,
        introducao_ludica: planoGerado.introducao_ludica,
        objetivo_bncc: planoGerado.objetivo_bncc,
        codigo_bncc: planoGerado.codigo_bncc,
        passo_a_passo: planoGerado.passo_a_passo,
        rubrica_avaliacao: planoGerado.rubrica_avaliacao,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erro ao salvar plano:", error);
    throw new Error("Falha ao salvar plano no banco de dados");
  }
}

async function buscarPlanosAula(professorId) {
  try {
    const { data, error } = await supabase
      .from("planos_aula")
      .select("*")
      .eq("professor_id", professorId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erro ao buscar planos:", error);
    throw new Error("Falha ao buscar planos de aula");
  }
}

module.exports = { supabase, salvarPlanoAula, buscarPlanosAula };
