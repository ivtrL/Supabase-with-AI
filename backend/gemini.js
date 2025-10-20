const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("./config");

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

async function gerarPlanoAula(dados) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
Você é um especialista em pedagogia e conhece profundamente a BNCC (Base Nacional Comum Curricular).

Crie um plano de aula completo e estruturado com base nas informações abaixo:

**DADOS DA AULA:**
- Disciplina: ${dados.disciplina}
- Ano Escolar: ${dados.ano_escolar}º ano
- Tema: ${dados.tema}
- Objetivo Principal: ${dados.objetivo_principal}
- Duração: ${dados.duracao_minutos} minutos
- Nível de Conhecimento dos Alunos: ${dados.nivel_conhecimento}
- Materiais Disponíveis: ${dados.materiais_disponiveis.join(", ")}
- Tipo de Atividade: ${dados.tipo_atividade}

**INSTRUÇÕES:**

Retorne um JSON com a seguinte estrutura EXATA:

{
  "introducao_ludica": "Uma introdução criativa e engajadora (2-3 parágrafos) que desperte a curiosidade dos alunos sobre o tema",
  "objetivo_bncc": "Objetivo de aprendizagem alinhado com a BNCC, específico e mensurável",
  "codigo_bncc": "Código da habilidade BNCC (ex: EF05MA08)",
  "passo_a_passo": [
    {
      "numero": 1,
      "titulo": "Título da etapa",
      "duracao": "tempo estimado",
      "descricao": "Descrição detalhada do que fazer",
      "materiais": ["lista", "de", "materiais"]
    }
  ],
  "rubrica_avaliacao": {
    "criterios": [
      {
        "criterio": "Nome do critério",
        "insuficiente": "Descrição do desempenho insuficiente",
        "basico": "Descrição do desempenho básico",
        "proficiente": "Descrição do desempenho proficiente",
        "avancado": "Descrição do desempenho avançado"
      }
    ]
  }
}

IMPORTANTE: Retorne APENAS o JSON, sem texto adicional antes ou depois.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse do JSON
    const planoGerado = JSON.parse(text);

    return planoGerado;
  } catch (error) {
    console.error("Erro ao gerar plano:", error);
    throw new Error("Falha ao gerar plano de aula com IA");
  }
}

module.exports = { gerarPlanoAula };
