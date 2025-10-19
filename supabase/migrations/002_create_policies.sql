ALTER TABLE planos_aula ENABLE ROW LEVEL SECURITY;
ALTER TABLE professores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seu próprio perfil"
ON professores FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil"
ON professores FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Professores podem ver seus próprios planos"
ON planos_aula FOR SELECT
USING (auth.uid() = professor_id);

CREATE POLICY "Professores podem criar seus próprios planos"
ON planos_aula FOR INSERT
WITH CHECK (auth.uid() = professor_id);

CREATE POLICY "Professores podem atualizar seus próprios planos"
ON planos_aula FOR UPDATE
USING (auth.uid() = professor_id);

CREATE POLICY "Professores podem deletar seus próprios planos"
ON planos_aula FOR DELETE
USING (auth.uid() = professor_id);