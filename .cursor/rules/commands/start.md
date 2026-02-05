# Command: /start

## Descrição
Inicia o trabalho em uma issue, criando branch, pasta de trabalho e documentação inicial.

## Uso
```
/start <numero-issue>
```

## Exemplos
```
/start 42

/start 15

/start 128
```

## Fluxo de Execução

1. **Ativar agente START**
   - Carregar regras de `.cursor/rules/agent-start.mdc`

2. **Buscar informações da issue**
   - Obter detalhes via `gh issue view {numero}`
   - Extrair título, descrição, labels

3. **Criar branch**
   - Formato: `issue-{numero}/{tipo}-{descricao-curta}`
   - Fazer checkout para o novo branch

4. **Criar estrutura de pastas**
   ```
   issues/
   └── issue-{numero}/
       ├── CONTEXT.md
       ├── ARCHITECTURE.md
       ├── PROGRESS.md
       └── NOTES.md
   ```

5. **Documentar contexto**
   - Popular CONTEXT.md com informações da issue
   - Analisar código existente
   - Identificar arquivos relacionados

6. **Documentar arquitetura**
   - Popular ARCHITECTURE.md com proposta de solução
   - Listar componentes afetados
   - Identificar riscos

7. **Commit inicial**
   - Commitar estrutura criada
   - Mensagem: `chore(issue-{num}): iniciar trabalho na issue`

8. **Confirmar**
   - Exibir resumo do que foi criado
   - Sugerir próximo passo: `/plan {numero}`

## Output Esperado
```
✅ Issue #42 iniciada!

🌿 Branch: issue-42/feature-product-api
📁 Pasta: issues/issue-42/

📄 Arquivos criados:
  - CONTEXT.md - Contexto e requisitos documentados
  - ARCHITECTURE.md - Arquitetura proposta
  - PROGRESS.md - Log de progresso iniciado
  - NOTES.md - Arquivo para anotações

🔍 Análise inicial:
  - 5 arquivos relacionados identificados
  - Componentes: backend, database
  - Complexidade estimada: Média

Próximo passo:
  /plan 42
```

## Pré-requisitos
- Issue deve existir no repositório
- Repositório git configurado
- Acesso ao GitHub (gh cli)

## Agente Relacionado
@agent-start
