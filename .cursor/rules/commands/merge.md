# Command: /merge

## Descrição
Realiza o merge do Pull Request, resolve conflitos automaticamente quando possível, ou escala para o usuário.

## Uso
```
/merge <numero-issue>
```

## Exemplos
```
/merge 42

/merge 15
```

## Fluxo de Execução

1. **Ativar agente MERGE**
   - Carregar regras de `.cursor/rules/agent-merge.mdc`

2. **Verificar pré-requisitos**
   - PR aprovado por reviewers
   - CI/CD passando
   - Branch atualizado

3. **Verificar conflitos**
   - Atualizar branch com main
   - Identificar arquivos em conflito

4. **Resolver conflitos**
   
   a. **Conflitos simples** (auto-resolve):
      - Whitespace/formatting
      - Import statements
      - Mudanças independentes

   b. **Conflitos complexos** (escalar):
      - Lógica de negócio
      - Mudanças estruturais
      - Perguntar ao usuário

5. **Executar merge**
   - Squash merge (padrão)
   - Deletar branch remoto
   - Deletar branch local

6. **Pós-merge**
   - Fechar issue automaticamente
   - Atualizar PROGRESS.md
   - Limpar pasta da issue (opcional)

7. **Confirmar**
   - Exibir resumo do merge
   - Issue fechada

## Output Esperado

### Merge Simples
```
🔀 Realizando merge da Issue #42...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Verificações:
   ✅ PR #87 aprovado
   ✅ CI/CD passando
   ✅ Branch atualizado

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔀 Executando squash merge...

✅ Merge concluído!

📊 Resumo:
   🔗 PR #87 merged para main
   📋 Issue #42 fechada
   🌿 Branch issue-42/feature-product-api deletado
   💾 Commits squashed: 9 → 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Issue #42 concluída com sucesso!

📁 Documentação preservada em: issues/issue-42/
```

### Com Resolução de Conflitos
```
🔀 Realizando merge da Issue #42...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Conflitos detectados em 2 arquivos:

🔧 Conflito 1: src/routes/index.ts
   Tipo: Import statements
   Resolução: ✅ Auto-resolvido (merge de imports)

🔧 Conflito 2: package.json
   Tipo: Versão de dependência
   Resolução: ✅ Auto-resolvido (versão mais recente)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔀 Executando squash merge...

✅ Merge concluído!
```

### Conflito Requer Intervenção
```
🔀 Realizando merge da Issue #42...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Conflito requer intervenção manual:

📄 Arquivo: src/services/product.service.ts
📍 Linhas: 45-62

Versão LOCAL (sua branch):
```typescript
async function calculatePrice(product: Product) {
  return product.basePrice * 1.1;
}
```

Versão REMOTE (main):
```typescript
async function calculatePrice(product: Product) {
  const tax = await getTaxRate(product.category);
  return product.basePrice * (1 + tax);
}
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ Por favor, escolha uma opção:

1. Manter versão LOCAL (sua implementação)
2. Manter versão REMOTE (main)
3. Combinar ambas (descreva como)
4. Resolver manualmente no editor

Digite sua escolha (1-4):
```

## Estratégias de Merge

| Estratégia | Quando Usar |
|------------|-------------|
| Squash | Features pequenas/médias (padrão) |
| Merge commit | Features grandes, preservar histórico |
| Rebase | Histórico linear desejado |

## Pré-requisitos
- PR criado e aprovado
- CI/CD passando (se configurado)

## Agente Relacionado
@agent-merge
