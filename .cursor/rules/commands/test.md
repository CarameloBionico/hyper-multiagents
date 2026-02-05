# Command: /test

## Descrição
Executa todos os testes relacionados à implementação e tenta corrigir falhas automaticamente.

## Uso
```
/test <numero-issue>
```

## Exemplos
```
/test 42

/test 15
```

## Fluxo de Execução

1. **Ativar agente TEST**
   - Carregar regras de `.cursor/rules/agent-test.mdc`

2. **Preparar ambiente**
   - Verificar dependências instaladas
   - Configurar ambiente de teste

3. **Executar testes unitários**
   ```bash
   npm run test:unit -- --coverage
   ```

4. **Executar testes de integração**
   ```bash
   npm run test:integration
   ```

5. **Analisar resultados**
   - Coletar métricas de cobertura
   - Identificar testes falhando
   - Classificar tipo de falha

6. **Tentar correções automáticas**
   - Para cada teste falhando:
     - Analisar erro
     - Propor correção
     - Aplicar e retestar
   - Máximo 3 tentativas por teste

7. **Gerar relatório**
   - Criar `issues/issue-{numero}/TEST_REPORT.md`
   - Incluir métricas e resultados

8. **Confirmar**
   - Se todos passaram: sugerir `/pr {numero}`
   - Se falhas persistem: notificar usuário

## Output Esperado

### Sucesso
```
🧪 Executando testes da Issue #42...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Testes Unitários
   Total: 24
   ✅ Passou: 24
   ❌ Falhou: 0
   ⏭️ Skipped: 0
   📊 Cobertura: 92%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 Testes de Integração
   Total: 8
   ✅ Passou: 8
   ❌ Falhou: 0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Todos os testes passaram!

📄 Relatório: issues/issue-42/TEST_REPORT.md

Próximo passo:
  /pr 42
```

### Com Correções
```
🧪 Executando testes da Issue #42...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Testes Unitários
   Total: 24
   ✅ Passou: 22
   ❌ Falhou: 2
   
⚠️ Tentando correções automáticas...

🔧 Falha 1: ProductService.create should validate input
   Causa: Mock incorreto
   Correção: Atualizado mock do repository
   Status: ✅ Corrigido

🔧 Falha 2: ProductService.update should throw NotFound
   Causa: Assertion errada
   Correção: Ajustado expect
   Status: ✅ Corrigido

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Re-executando testes...

📦 Testes Unitários
   Total: 24
   ✅ Passou: 24
   ❌ Falhou: 0
   📊 Cobertura: 92%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Todos os testes passaram após correções!

Próximo passo:
  /pr 42
```

### Com Falhas Persistentes
```
🧪 Executando testes da Issue #42...

❌ 2 testes falhando após 3 tentativas de correção

Falhas que requerem intervenção:

1. ProductService.create should validate input
   Arquivo: tests/unit/product.service.test.ts:45
   Erro: Expected function to throw ValidationError
   Tentativas: 3
   
2. API /products POST should return 201
   Arquivo: tests/integration/products.test.ts:23
   Erro: Timeout exceeded
   Tentativas: 3

⚠️ Por favor, revise manualmente e execute /test 42 novamente.
```

## Pré-requisitos
- `/execute {numero}` já executado
- Testes implementados

## Agente Relacionado
@agent-test
