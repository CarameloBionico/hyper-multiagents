# Command: /issue

## Descrição
Cria uma nova issue no repositório GitHub a partir de uma descrição do usuário.

## Uso
```
/issue <descrição da tarefa>
```

## Exemplos
```
/issue Criar API REST para gerenciamento de produtos com CRUD completo

/issue Corrigir bug de autenticação que expira token antes do tempo

/issue Refatorar camada de acesso a dados para usar repository pattern
```

## Fluxo de Execução

1. **Ativar agente ISSUE**
   - Carregar regras de `.cursor/rules/agent-issue.mdc`

2. **Processar descrição**
   - Analisar tipo de tarefa (feature, bug, refactor, etc.)
   - Identificar componentes afetados
   - Extrair requisitos implícitos

3. **Estruturar issue**
   - Gerar título apropriado
   - Criar descrição detalhada
   - Definir critérios de aceite
   - Selecionar labels

4. **Criar no GitHub**
   - Usar `gh issue create` ou GitHub API
   - Capturar número da issue

5. **Confirmar**
   - Exibir link da issue criada
   - Sugerir próximo passo: `/start {numero}`

## Output Esperado
```
✅ Issue criada com sucesso!

📋 Issue #42: Criar API REST de gerenciamento de produtos
🏷️ Labels: feature, backend
🔗 Link: https://github.com/user/repo/issues/42

Próximo passo:
  /start 42
```

## Parâmetros Opcionais
- `--label <label>` - Forçar label específica
- `--assignee <user>` - Atribuir a usuário
- `--milestone <name>` - Associar a milestone

## Agente Relacionado
@agent-issue
