# Command: /execute

## Descrição
Executa o plano de implementação, chamando sub-agentes especialistas para cada tarefa.

## Uso
```
/execute <numero-issue>
```

## Exemplos
```
/execute 42

/execute 15
```

## Fluxo de Execução

1. **Ativar agente EXECUTION**
   - Carregar regras de `.cursor/rules/agent-execution.mdc`

2. **Carregar plano**
   - Ler `issues/issue-{numero}/PLAN.md`
   - Identificar próxima tarefa pendente

3. **Para cada tarefa**
   
   a. **Identificar sub-agente**
      - @dev-backend para APIs e lógica
      - @dev-frontend para UI
      - @dev-database para schemas
      - @dev-test para testes
      - @dev-infra para configs
      - @dev-docs para documentação

   b. **Executar sub-agente**
      - Passar contexto da tarefa
      - Aguardar conclusão

   c. **Verificar resultado**
      - Código compila
      - Linter passa
      - Testes existentes passam

   d. **Hook de documentação**
      - Verificar comentários
      - Completar JSDoc/docstrings se necessário

   e. **Commit da tarefa**
      - Commitar mudanças
      - Marcar tarefa como concluída no PLAN.md

   f. **Atualizar progresso**
      - Atualizar PROGRESS.md
      - Log da tarefa concluída

4. **Ao concluir todas as tarefas**
   - Resumo de execução
   - Sugerir próximo passo: `/test {numero}`

## Output Esperado
```
🚀 Executando plano da Issue #42...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Tarefa 1.1: Configurar estrutura de pastas
   🤖 Sub-agente: @dev-backend
   ⏱️ Status: ✅ Concluída
   📝 Arquivos: src/products/, src/types/product.ts
   💾 Commit: abc123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Tarefa 1.2: Criar schema do banco
   🤖 Sub-agente: @dev-database
   ⏱️ Status: ✅ Concluída
   📝 Arquivos: prisma/schema.prisma, migrations/
   💾 Commit: def456

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

... (continua para cada tarefa)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Execução concluída!

📊 Resumo:
  - Tarefas executadas: 9/9
  - Commits realizados: 9
  - Arquivos criados: 12
  - Arquivos modificados: 3
  - Documentação: ✅ Verificada

Próximo passo:
  /test 42
```

## Comportamento em Erros
- Se tarefa falhar: tenta novamente (máx 3x)
- Se persistir: pausa e notifica usuário
- Rollback disponível se necessário

## Hooks Executados
- Hook de documentação após cada tarefa

## Pré-requisitos
- `/plan {numero}` já executado
- PLAN.md existente com tarefas

## Agente Relacionado
@agent-execution
