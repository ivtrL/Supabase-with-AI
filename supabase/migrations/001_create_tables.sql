CREATE TABLE professores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Índices para melhorar performance
CREATE INDEX idx_planos_professor ON planos_aula(professor_id);
CREATE INDEX idx_planos_disciplina ON planos_aula(disciplina);
CREATE INDEX idx_planos_ano ON planos_aula(ano_escolar);