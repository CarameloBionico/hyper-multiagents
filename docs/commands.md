# Referência de Commands

## agent-issue

**Propósito**: Transformar descrições em issues bem estruturadas.

**Uso**:
```
/agent-issue Implementar feature X com Y e Z
```

**Saída**:
- Issue criada no GitHub
- Número e link da issue

**Exemplo de Issue Gerada**:
```markdown
## Descrição
Implementar feature X com Y e Z...

## Critérios de Aceitação
- [ ] Critério 1
- [ ] Critério 2

## Notas Técnicas
...
```

---

## agent-start

**Propósito**: Preparar ambiente de desenvolvimento para uma issue.

**Uso**:
```
/agent-start #123
/agent-start  # Usa última issue atribuída
```

**Ações**:
1. Busca detalhes da issue
2. Cria branch `feature/issue-123-slug`
3. Cria pasta `.issues/123/`
4. Documenta contexto e arquitetura

**Saída**:
- Branch criado
- Arquivos CONTEXT.md e ARCHITECTURE.md

---

## agent-plan

**Propósito**: Criar plano de execução detalhado.

**Uso**:
```
/agent-plan #123
```

**Pré-requisitos**:
- CONTEXT.md existente
- ARCHITECTURE.md existente

**Saída**:
- PLAN.md com checklist de tarefas
- Tarefas marcadas com sub-agentes responsáveis

---

## agent-execute

**Propósito**: Executar o plano de implementação.

**Uso**:
```
/agent-execute #123
```

**Pré-requisitos**:
- PLAN.md existente

**Ações**:
1. Lê PLAN.md
2. Executa tarefas em ordem
3. Delega para sub-agentes quando marcado
4. Atualiza status no PLAN.md

**Sub-agentes**:
- `@dev-backend` → dev-backend
- `@dev-frontend` → dev-frontend
- `@dev-database` → dev-database
- `@dev-test` → dev-test

---

## agent-test

**Propósito**: Executar e corrigir testes.

**Uso**:
```
/agent-test #123
/agent-test  # Roda todos os testes
```

**Ações**:
1. Detecta framework de teste
2. Executa suíte de testes
3. Analisa falhas
4. Tenta corrigir (máx 3 tentativas)

**Saída**:
- Relatório de testes
- Correções aplicadas

---

## agent-pr

**Propósito**: Preparar e criar Pull Request.

**Uso**:
```
/agent-pr #123
```

**Pré-requisitos**:
- Testes passando
- Branch com commits

**Ações**:
1. Coleta informações da issue
2. Gera diff das mudanças
3. Cria PR com template completo

**Saída**:
- PR criado no GitHub
- Link do PR

---

## agent-merge

**Propósito**: Fazer merge do PR com segurança.

**Uso**:
```
/agent-merge #123
```

**Pré-requisitos**:
- PR aprovado
- Checks passando

**Ações**:
1. Verifica aprovação
2. Verifica conflitos
3. Resolve conflitos simples ou pede ajuda
4. Executa merge
5. Limpa branch

**Saída**:
- Merge concluído ou
- Relatório de conflitos para resolução manual
