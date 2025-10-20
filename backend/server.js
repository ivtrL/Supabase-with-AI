const express = require("express");
const cors = require("cors");
const config = require("./config");
const { gerarPlanoAula } = require("./gemini");
const { salvarPlanoAula, buscarPlanosAula } = require("./supabase");

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*", // ideal: setar a URL do frontend em produção
  })
);
app.use(express.json());
app.use(express.static("frontend"));

// Validação de inputs
function validarDados(dados) {
  const erros = [];

  if (!dados.disciplina || dados.disciplina.trim() === "") {
    erros.push("Disciplina é obrigatória");
  }

  if (!dados.ano_escolar || dados.ano_escolar < 1 || dados.ano_escolar > 9) {
    erros.push("Ano escolar deve estar entre 1 e 9");
  }

  if (!dados.tema || dados.tema.trim() === "") {
    erros.push("Tema é obrigatório");
  }

  if (!dados.objetivo_principal || dados.objetivo_principal.trim() === "") {
    erros.push("Objetivo principal é obrigatório");
  }

  if (!dados.duracao_minutos || dados.duracao_minutos < 10) {
    erros.push("Duração deve ser de pelo menos 10 minutos");
  }

  if (
    !dados.materiais_disponiveis ||
    dados.materiais_disponiveis.length === 0
  ) {
    erros.push("Pelo menos um material disponível deve ser informado");
  }

  return erros;
}

// Endpoint principal
app.post("/api/gerar-plano", async (req, res) => {
  try {
    const dados = req.body;

    // Validação
    const erros = validarDados(dados);
    if (erros.length > 0) {
      return res.status(400).json({ erro: "Dados inválidos", detalhes: erros });
    }

    // Gerar plano com IA
    const planoGerado = await gerarPlanoAula(dados);

    // Salvar no Supabase
    const planoSalvo = await salvarPlanoAula(
      dados.professor_id,
      dados,
      planoGerado
    );

    res.json({
      sucesso: true,
      plano: planoSalvo,
    });
  } catch (error) {
    console.error("Erro no endpoint:", error);
    res.status(500).json({
      erro: "Erro ao gerar plano de aula",
      mensagem: error.message,
    });
  }
});

// Buscar planos do professor
app.get("/api/planos/:professorId", async (req, res) => {
  try {
    const { professorId } = req.params;
    const planos = await buscarPlanosAula(professorId);
    res.json({ planos });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
});
