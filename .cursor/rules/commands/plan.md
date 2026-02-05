# Command: /plan

## Descrição
Cria um plano de execução detalhado (checklist) a partir do contexto e arquitetura documentados.

## Uso
```
/plan <numero-issue>
```

## Exemplos
```
/plan 42

/plan 15
```

## Fluxo de Execução

1. **Ativar agente PLAN**
   - Carregar regras de `.cursor/rules/agent-plan.mdc`

2. **Carregar documentação**
   - Ler `issues/issue-{numero}/CONTEXT.md`
   - Ler `issues/issue-{numero}/ARCHITECTURE.md`

3. **Analisar escopo**
   - Identificar componentes afetados
   - Mapear complexidade
   - Identificar dependências

4. **Criar tarefas**
   - Quebrar em tarefas atômicas (15-30 min cada)
   - Atribuir a sub-agentes especialistas
   - Definir ordem de execução

5. **Definir testes**
   - Listar testes unitários necessários
   - Definir testes de integração
   - Especificar cenários de teste

6. **Gerar PLAN.md**
   - Criar checklist estruturado
   - Incluir dependências entre tarefas
   - Documentar critérios de conclusão

7. **Commit do plano**
   - Commitar PLAN.md
   - Mensagem: `docs(issue-{num}): criar plano de execução`

8. **Confirmar**
   - Exibir resumo do plano
   - Sugerir próximo passo: `/execute {numero}`

## Output Esperado
```
✅ Plano criado para Issue #42!

📋 PLAN.md gerado com:

Fase 1: Preparação (2 tarefas)
  - [ ] 1.1 Configurar estrutura de pastas @dev-backend
  - [ ] 1.2 Criar schema do banco @dev-database

Fase 2: Backend (4 tarefas)
  - [ ] 2.1 Criar modelo Product @dev-backend
  - [ ] 2.2 Implementar ProductService @dev-backend
  - [ ] 2.3 Criar endpoints CRUD @dev-backend
  - [ ] 2.4 Adicionar validações @dev-backend

Fase 3: Testes (2 tarefas)
  - [ ] 3.1 Testes unitários do serviço @dev-test
  - [ ] 3.2 Testes de integração API @dev-test

Fase 4: Documentação (1 tarefa)
  - [ ] 4.1 Documentar API (OpenAPI) @dev-docs

📊 Resumo:
  - Total de tarefas: 9
  - Sub-agentes envolvidos: 4
  - Dependências mapeadas: 6

Próximo passo:
  /execute 42
```

## Pré-requisitos
- `/start {numero}` já executado
- CONTEXT.md e ARCHITECTURE.md existentes

## Agente Relacionado
@agent-plan
