# Command: /pr

## Descrição
Prepara e cria um Pull Request com relatório completo da implementação.

## Uso
```
/pr <numero-issue>
```

## Exemplos
```
/pr 42

/pr 15
```

## Fluxo de Execução

1. **Ativar agente PR**
   - Carregar regras de `.cursor/rules/agent-pr.mdc`

2. **Coletar informações**
   - Diff completo do branch
   - Lista de commits
   - Arquivos modificados
   - Documentação da issue

3. **Compilar relatório**
   - Consolidar CONTEXT, ARCHITECTURE, PLAN, TEST_REPORT
   - Gerar resumo das mudanças
   - Listar decisões técnicas

4. **Verificações pré-PR**
   - Atualizar branch com main
   - Verificar conflitos
   - Rodar linter
   - Rodar testes

5. **Criar Pull Request**
   - Título estruturado
   - Descrição detalhada
   - Checklist de qualidade
   - Labels apropriadas

6. **Confirmar**
   - Exibir link do PR
   - Sugerir próximo passo após aprovação: `/merge {numero}`

## Output Esperado
```
📤 Criando Pull Request para Issue #42...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Verificações pré-PR:
   ✅ Branch atualizado com main
   ✅ Sem conflitos
   ✅ Linter: OK
   ✅ Testes: 32/32 passando

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Resumo das mudanças:
   📁 Arquivos criados: 8
   📝 Arquivos modificados: 3
   🗑️ Arquivos removidos: 0
   ➕ Linhas adicionadas: 542
   ➖ Linhas removidas: 12
   💾 Commits: 9

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Pull Request criado!

🔗 PR #87: [Issue #42] feat: Implementar API de produtos
   URL: https://github.com/user/repo/pull/87
   
🏷️ Labels: feature, needs-review
👥 Reviewers: @reviewer1, @reviewer2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Checklist do PR:
   ✅ Código segue padrões do projeto
   ✅ Sem warnings do linter
   ✅ Testes adicionados
   ✅ Cobertura >= 80%
   ✅ Documentação atualizada

Próximos passos:
  1. Aguardar review
  2. Endereçar feedback (se houver)
  3. Após aprovação: /merge 42
```

## Estrutura do PR Gerado

```markdown
## 📋 Descrição

Implementação da API REST para gerenciamento de produtos.

Closes #42

## 🎯 Tipo de Mudança

- [x] ✨ Nova funcionalidade (feature)

## 📝 Mudanças Realizadas

### Arquivos Criados
| Arquivo | Descrição |
|---------|-----------|
| src/services/product.service.ts | Serviço de produtos |
| src/routes/product.routes.ts | Rotas da API |
| ... | ... |

## 🧪 Testes

- Cobertura: 92%
- Todos os 32 testes passando

## ✅ Checklist

- [x] Código segue os padrões
- [x] Testes adicionados
- [x] Documentação atualizada
```

## Pré-requisitos
- `/test {numero}` executado com sucesso
- Todos os testes passando

## Agente Relacionado
@agent-pr
