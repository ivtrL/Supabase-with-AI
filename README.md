# 🎓 Gerador de Planos de Aula com IA

Sistema web que gera planos de aula personalizados e alinhados à BNCC utilizando Inteligência Artificial (Google Gemini).

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte de um teste técnico para a vaga de Desenvolvedor Júnior/Estagiário. O sistema permite que professores criem planos de aula completos e estruturados de forma automatizada, incluindo:

- ✨ Introdução lúdica e engajadora
- 🎯 Objetivos de aprendizagem alinhados à BNCC
- 📝 Passo a passo detalhado da atividade
- ✅ Rubrica de avaliação com critérios claros

## 🚀 Tecnologias Utilizadas

### Backend

- **Node.js** + **Express.js** - Servidor e API REST
- **Supabase** - Banco de dados PostgreSQL e autenticação
- **Google Gemini API** - Geração de conteúdo com IA

### Frontend

- **HTML5** + **CSS3** + **JavaScript Vanilla**
- Design responsivo e moderno

### Bibliotecas

- `@supabase/supabase-js` - Cliente Supabase
- `@google/generative-ai` - Cliente Google Gemini
- `dotenv` - Gerenciamento de variáveis de ambiente
- `cors` - Controle de CORS

## 📊 Escolha do Modelo de IA

### Modelo Selecionado: **Gemini 2.5 Flash**

#### Justificativa:

1. **Gratuidade**: Não requer cartão de crédito para uso
2. **Performance**: Latência baixa (importante para UX)
3. **Contexto**: 1M tokens de contexto (suficiente para exemplos BNCC)
4. **JSON Mode**: Suporte nativo a respostas estruturadas em JSON
5. **Taxa de requisições**: Limite generoso para desenvolvimento e testes
6. **Custo-benefício**: Ideal para MVPs e projetos educacionais

#### Comparação com Alternativas:

| Modelo           | Latência | Contexto | JSON Mode | Gratuito    |
| ---------------- | -------- | -------- | --------- | ----------- |
| Gemini 2.5 Flash | ⚡ Baixa | 1M       | ✅        | ✅          |
| Gemini 2.5 Pro   | 🐢 Média | 2M       | ✅        | ⚠️ Limitado |
| GPT-3.5 Turbo    | ⚡ Baixa | 16K      | ✅        | ❌          |
| Claude 3 Haiku   | ⚡ Baixa | 200K     | ✅        | ❌          |

## 🗄️ Modelagem de Dados

### Estrutura do Banco de Dados

```sql
-- Tabela de professores
CREATE TABLE professores (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de planos de aula
CREATE TABLE planos_aula (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professor_id UUID REFERENCES professores(id) ON DELETE CASCADE,

  -- Inputs do usuário
  disciplina TEXT NOT NULL,
  ano_escolar INTEGER NOT NULL CHECK (ano_escolar BETWEEN 1 AND 9),
  tema TEXT NOT NULL,
  objetivo_principal TEXT NOT NULL,
  duracao_minutos INTEGER NOT NULL,
  nivel_conhecimento TEXT CHECK (nivel_conhecimento IN ('básico', 'intermediário', 'avançado')),
  materiais_disponiveis TEXT[],
  tipo_atividade TEXT,

  -- Outputs da IA
  introducao_ludica TEXT NOT NULL,
  objetivo_bncc TEXT NOT NULL,
  codigo_bncc TEXT,
  passo_a_passo JSONB NOT NULL,
  rubrica_avaliacao JSONB NOT NULL,

  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Diagrama de Relacionamento

```
┌─────────────────┐
│   professores   │
├─────────────────┤
│ id (PK)         │
│ email           │
│ nome            │
│ created_at      │
└─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│  planos_aula    │
├─────────────────┤
│ id (PK)         │
│ professor_id(FK)│
│ disciplina      │
│ ano_escolar     │
│ tema            │
│ ...             │
└─────────────────┘
```

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Chave API do Google AI Studio

### Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/gerador-planos-aula.git
cd gerador-planos-aula
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Configure o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto
2. Vá em **SQL Editor** e execute os scripts SQL fornecidos em `database/schema.sql`
3. Copie a **URL** e a **anon key** do projeto (Settings > API)

#### 4. Configure o Google AI Studio

1. Acesse [aistudio.google.com](https://aistudio.google.com)
2. Crie uma nova API key
3. Copie a chave gerada

#### 5. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima-aqui
GEMINI_API_KEY=sua-chave-gemini-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-aqui
PORT=3000
```

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env` no Git!

#### 6. Execute o projeto

```bash
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

## 🎯 Como Usar

1. Acesse a aplicação no navegador
2. Preencha o formulário com:
   - ID do professor (UUID)
   - Disciplina e ano escolar
   - Tema e objetivo da aula
   - Duração e materiais disponíveis
3. Clique em "Gerar Plano de Aula"
4. Aguarde enquanto a IA processa (15-30 segundos)
5. Visualize o plano completo gerado
6. O plano é automaticamente salvo no banco de dados

## 📁 Estrutura do Projeto

```
gerador-planos-aula/
├── backend/
│   ├── config.js           # Configurações gerais
│   ├── gemini.js          # Integração com Gemini API
│   ├── supabase.js        # Integração com Supabase
│   └── server.js          # Servidor Express
├── frontend/
│   ├── app.js
│   ├── styles.css
│   └── index.html
├── database/
│   └── schema.sql         # Scripts de criação do banco
├── .env.example           # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Decisões Técnicas

### 1. Validação de Dados

**Decisão**: Validação tanto no frontend quanto no backend

**Justificativa**:

- Frontend: Melhora UX com feedback imediato
- Backend: Garante segurança e integridade dos dados

### 2. Formato JSON para Respostas da IA

**Decisão**: Uso do JSON mode do Gemini

**Justificativa**:

- Parsing confiável e estruturado
- Reduz erros de formatação
- Facilita manipulação dos dados

### 3. JSONB no PostgreSQL

**Decisão**: Usar JSONB para `passo_a_passo` e `rubrica_avaliacao`

**Justificativa**:

- Flexibilidade na estrutura dos dados
- Performance superior ao JSON tradicional
- Permite queries complexas quando necessário

### 4. Row Level Security (RLS)

**Decisão**: Implementar RLS no Supabase

**Justificativa**:

- Segurança automática a nível de banco
- Professores só acessam seus próprios planos
- Reduz necessidade de validações no backend

## 🐛 Tratamento de Erros

O sistema implementa tratamento de erros em múltiplas camadas:

### Frontend

- Validação de formulário antes do envio
- Feedback visual de erros
- Estados de loading

### Backend

- Validação de inputs com mensagens claras
- Try-catch em todas as operações assíncronas
- Logs detalhados para debugging

### Exemplos de Erros Tratados

- Campos obrigatórios não preenchidos
- Valores fora do range permitido
- Falha na comunicação com APIs externas
- Erros de parsing JSON
- Violações de constraints do banco

## 🚧 Desafios Encontrados e Soluções

### Desafio 1: Consistência nas Respostas da IA

**Problema**: Gemini às vezes retornava texto adicional além do JSON

**Solução**:

- Configuração explícita do `responseMimeType: "application/json"`
- Prompt detalhado com exemplos da estrutura esperada
- Validação e limpeza da resposta antes do parsing

### Desafio 2: Códigos BNCC Precisos

**Problema**: IA gerava códigos BNCC genéricos ou incorretos

**Solução**:

- Enriquecimento do prompt com contexto da BNCC
- Instrução explícita para buscar códigos reais
- Validação humana recomendada na documentação

### Desafio 3: Performance no Carregamento

**Problema**: Chamadas à API do Gemini podem levar 20-30 segundos

**Solução**:

- Estado de loading visual claro
- Mensagens de progresso para o usuário
- Otimização do prompt para respostas mais rápidas

## 🧪 Testes

### Testes Manuais Recomendados

```bash
# Teste 1: Plano de Matemática - 5º ano
Disciplina: Matemática
Ano: 5º ano
Tema: Frações
Resultado esperado: Plano com atividades práticas e visuais

# Teste 2: Plano de Português - 3º ano
Disciplina: Português
Ano: 3º ano
Tema: Pontuação
Resultado esperado: Atividades lúdicas apropriadas para a idade

# Teste 3: Validação de erros
Deixar campos obrigatórios vazios
Resultado esperado: Mensagens de erro claras
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte de um teste técnico.

## 👤 Autor

Isaac Vitorino

- GitHub: [@ivtrl](https://github.com/ivtrl)
- Email: isaacvitorinola@gmail.com
