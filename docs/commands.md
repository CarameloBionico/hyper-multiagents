# Referência de Commands

Este documento descreve todos os commands disponíveis no sistema multi-agente.

## Resumo

| Command | Propósito | Uso |
|---------|-----------|-----|
| `/issue` | Criar issue | `/issue <descrição>` |
| `/start` | Iniciar trabalho | `/start <numero>` |
| `/plan` | Criar plano | `/plan <numero>` |
| `/execute` | Implementar | `/execute <numero>` |
| `/test` | Testar | `/test <numero>` |
| `/pr` | Criar PR | `/pr <numero>` |
| `/merge` | Fazer merge | `/merge <numero>` |

---

## /issue

### Descrição
Cria uma nova issue no repositório GitHub a partir de uma descrição em linguagem natural.

### Sintaxe
```
/issue <descrição da tarefa>
```

### Exemplos
```
/issue Criar API REST para gerenciamento de produtos com CRUD completo

/issue Corrigir bug de autenticação que expira token antes do tempo

/issue Refatorar camada de acesso a dados para usar repository pattern
```

### O que faz
1. Analisa a descrição fornecida
2. Identifica tipo de tarefa (feature, bug, refactor)
3. Estrutura a issue com:
   - Título claro e conciso
   - Descrição detalhada
   - Critérios de aceite
   - Labels apropriadas
4. Cria a issue no GitHub

### Output
```
✅ Issue criada com sucesso!

📋 Issue #42: Criar API REST de gerenciamento de produtos
🏷️ Labels: feature, backend
🔗 Link: https://github.com/user/repo/issues/42

Próximo passo:
  /start 42
```

### Arquivo de Regras
`.cursor/rules/commands/issue.md`

---

## /start

### Descrição
Inicia o trabalho em uma issue existente, criando branch e estrutura de documentação.

### Sintaxe
```
/start <numero-issue>
```

### Exemplos
```
/start 42
/start 15
/start 128
```

### O que faz
1. Busca detalhes da issue no GitHub
2. Cria branch com padrão de nomenclatura
3. Cria pasta `issues/issue-{numero}/`
4. Gera arquivos de documentação:
   - `CONTEXT.md` - Contexto e requisitos
   - `ARCHITECTURE.md` - Arquitetura proposta
   - `PROGRESS.md` - Log de progresso
   - `NOTES.md` - Anotações
5. Faz commit inicial

### Output
```
✅ Issue #42 iniciada!

🌿 Branch: issue-42/feature-product-api
📁 Pasta: issues/issue-42/

📄 Arquivos criados:
  - CONTEXT.md
  - ARCHITECTURE.md
  - PROGRESS.md
  - NOTES.md

Próximo passo:
  /plan 42
```

### Pré-requisitos
- Issue deve existir no GitHub
- Repositório git configurado

### Arquivo de Regras
`.cursor/rules/commands/start.md`

---

## /plan

### Descrição
Cria um plano de execução detalhado com checklist de tarefas atômicas.

### Sintaxe
```
/plan <numero-issue>
```

### Exemplos
```
/plan 42
/plan 15
```

### O que faz
1. Lê `CONTEXT.md` e `ARCHITECTURE.md`
2. Analisa escopo e complexidade
3. Quebra em tarefas de 15-30 minutos
4. Atribui cada tarefa a um sub-agente
5. Define ordem de execução
6. Gera `PLAN.md` com checklist

### Output
```
✅ Plano criado para Issue #42!

📋 PLAN.md gerado com:

Fase 1: Preparação (2 tarefas)
Fase 2: Backend (4 tarefas)
Fase 3: Testes (2 tarefas)
Fase 4: Documentação (1 tarefa)

📊 Resumo:
  - Total de tarefas: 9
  - Sub-agentes envolvidos: 4

Próximo passo:
  /execute 42
```

### Pré-requisitos
- `/start {numero}` executado
- `CONTEXT.md` e `ARCHITECTURE.md` existentes

### Arquivo de Regras
`.cursor/rules/commands/plan.md`

---

## /execute

### Descrição
Executa o plano de implementação, chamando sub-agentes para cada tarefa.

### Sintaxe
```
/execute <numero-issue>
```

### Exemplos
```
/execute 42
/execute 15
```

### O que faz
Para cada tarefa no `PLAN.md`:
1. Identifica sub-agente responsável
2. Prepara contexto para o sub-agente
3. Executa implementação
4. Verifica resultado (compila, linter)
5. Executa hook de documentação
6. Faz commit da tarefa
7. Marca como concluída
8. Atualiza `PROGRESS.md`

### Output
```
🚀 Executando plano da Issue #42...

📌 Tarefa 1.1: Configurar estrutura
   🤖 Sub-agente: @dev-backend
   ⏱️ Status: ✅ Concluída
   💾 Commit: abc123

... (para cada tarefa)

✅ Execução concluída!

📊 Resumo:
  - Tarefas executadas: 9/9
  - Commits realizados: 9

Próximo passo:
  /test 42
```

### Pré-requisitos
- `/plan {numero}` executado
- `PLAN.md` existente

### Arquivo de Regras
`.cursor/rules/commands/execute.md`

---

## /test

### Descrição
Executa testes e tenta corrigir falhas automaticamente.

### Sintaxe
```
/test <numero-issue>
```

### Exemplos
```
/test 42
/test 15
```

### O que faz
1. Executa testes unitários com cobertura
2. Executa testes de integração
3. Analisa resultados
4. Para falhas:
   - Analisa causa
   - Tenta correção automática (máx 3x)
   - Escala para usuário se necessário
5. Gera `TEST_REPORT.md`

### Output (Sucesso)
```
🧪 Executando testes da Issue #42...

📦 Testes Unitários
   Total: 24
   ✅ Passou: 24
   📊 Cobertura: 92%

🔗 Testes de Integração
   Total: 8
   ✅ Passou: 8

✅ Todos os testes passaram!

Próximo passo:
  /pr 42
```

### Output (Com Correções)
```
⚠️ Tentando correções automáticas...

🔧 Falha 1: ProductService.create
   Correção: Ajustado mock
   Status: ✅ Corrigido

✅ Todos os testes passaram após correções!
```

### Pré-requisitos
- `/execute {numero}` executado
- Testes implementados

### Arquivo de Regras
`.cursor/rules/commands/test.md`

---

## /pr

### Descrição
Prepara e cria um Pull Request completo com descrição detalhada.

### Sintaxe
```
/pr <numero-issue>
```

### Exemplos
```
/pr 42
/pr 15
```

### O que faz
1. Coleta informações do branch
2. Compila documentação (CONTEXT, ARCHITECTURE, PLAN, TEST_REPORT)
3. Verifica pré-requisitos (branch atualizado, linter, testes)
4. Gera descrição estruturada do PR
5. Cria PR no GitHub
6. Atribui labels e reviewers

### Output
```
📤 Criando Pull Request para Issue #42...

🔍 Verificações:
   ✅ Branch atualizado
   ✅ Linter OK
   ✅ Testes passando

✅ Pull Request criado!

🔗 PR #87: [Issue #42] feat: Implementar API de produtos
   URL: https://github.com/user/repo/pull/87

Próximos passos:
  1. Aguardar review
  2. Após aprovação: /merge 42
```

### Pré-requisitos
- `/test {numero}` executado com sucesso
- Todos os testes passando

### Arquivo de Regras
`.cursor/rules/commands/pr.md`

---

## /merge

### Descrição
Realiza merge do PR aprovado, resolvendo conflitos quando possível.

### Sintaxe
```
/merge <numero-issue>
```

### Exemplos
```
/merge 42
/merge 15
```

### O que faz
1. Verifica aprovação do PR
2. Verifica CI/CD
3. Atualiza branch com main
4. Identifica conflitos
5. Resolve conflitos simples automaticamente
6. Para conflitos complexos, pergunta ao usuário
7. Executa squash merge
8. Deleta branch
9. Fecha issue

### Output (Sem Conflitos)
```
🔀 Realizando merge da Issue #42...

✅ Merge concluído!

📊 Resumo:
   🔗 PR #87 merged
   📋 Issue #42 fechada
   🌿 Branch deletado

🎉 Issue #42 concluída com sucesso!
```

### Output (Com Conflitos)
```
⚠️ Conflitos detectados:

🔧 Conflito 1: src/routes/index.ts
   Tipo: Import statements
   Resolução: ✅ Auto-resolvido

✅ Merge concluído!
```

### Pré-requisitos
- PR criado e aprovado
- CI/CD passando

### Arquivo de Regras
`.cursor/rules/commands/merge.md`

---

## Fluxo Completo

```
/issue "Implementar feature X"
         │
         ▼
      Issue #42
         │
         ▼
    /start 42
         │
         ▼
     /plan 42
         │
         ▼
   /execute 42
         │
         ▼
    /test 42
         │
         ▼
      /pr 42
         │
    [Review]
         │
         ▼
   /merge 42
         │
         ▼
    Concluído!
```
