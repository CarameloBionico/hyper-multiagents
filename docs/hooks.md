# Documentação dos Hooks

Hooks são ações automáticas executadas em momentos específicos do workflow.

## Hook de Documentação

### Propósito
Garantir que todo código inserido ou modificado esteja adequadamente documentado.

### Quando é Executado
- Após cada tarefa concluída pelo agente EXECUTION
- Antes de cada commit de tarefa
- Pode ser chamado manualmente

### O que Verifica

#### Para TypeScript/JavaScript
- Funções exportadas têm JSDoc/TSDoc
- Interfaces/Types têm descrição
- Parâmetros complexos documentados
- Retornos documentados
- Exceções documentadas (@throws)
- Exemplos de uso quando útil (@example)

#### Para Python
- Funções/métodos têm docstrings
- Classes têm docstrings
- Parâmetros documentados (Args:)
- Retornos documentados (Returns:)
- Exceções documentadas (Raises:)

### Fluxo de Execução

```
┌─────────────────────────────────────────┐
│         Tarefa Concluída                │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│   Identificar arquivos modificados      │
│   git diff --name-only HEAD~1           │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│   Para cada arquivo:                    │
│   - Verificar funções documentadas      │
│   - Verificar interfaces documentadas   │
│   - Verificar classes documentadas      │
└─────────────────┬───────────────────────┘
                  │
            ┌─────┴─────┐
            │           │
      [Completa]   [Faltando]
            │           │
            │           ▼
            │    ┌────────────────┐
            │    │ Gerar docs     │
            │    │ automaticamente│
            │    │ (@dev-docs)    │
            │    └───────┬────────┘
            │            │
            └──────┬─────┘
                   │
                   ▼
            [Prosseguir]
```

### Exemplo de Verificação

```markdown
## Verificação de Documentação

### Arquivo: src/services/product.service.ts

#### Funções
| Função | JSDoc | Params | Return | Status |
|--------|-------|--------|--------|--------|
| create | ✅ | ✅ | ✅ | OK |
| update | ❌ | - | - | PENDENTE |
| delete | ✅ | ✅ | ✅ | OK |

#### Interfaces
| Nome | Descrição | Props | Status |
|------|-----------|-------|--------|
| Product | ✅ | ✅ | OK |
| CreateDTO | ❌ | ❌ | PENDENTE |
```

### Completação Automática

Quando documentação faltante é detectada:

1. **Analisa contexto**
   - Lê código da função
   - Entende propósito pelo uso
   - Identifica parâmetros e retornos

2. **Gera documentação**
   ```typescript
   // Antes
   async function updateProduct(id: string, data: UpdateDTO) {
     // ...
   }

   // Depois
   /**
    * Atualiza um produto existente.
    *
    * @param id - ID do produto a atualizar
    * @param data - Dados para atualização
    * @returns Produto atualizado
    * @throws {NotFoundError} Se produto não existe
    */
   async function updateProduct(id: string, data: UpdateDTO) {
     // ...
   }
   ```

3. **Aplica mudanças**
   - Insere documentação no código
   - Mantém estilo consistente

### Output

#### Sucesso (Sem Ações)
```
📝 Hook de Documentação - product.service.ts

✅ Documentação verificada e completa

Elementos documentados:
  - 5 funções
  - 3 interfaces

Nenhuma ação necessária.
```

#### Com Correções
```
📝 Hook de Documentação - product.service.ts

⚠️ Documentação incompleta detectada

Ações realizadas:
  ✅ Adicionado JSDoc: updateProduct()
  ✅ Documentada interface: UpdateProductDTO

Elementos agora documentados:
  - 5/5 funções ✅
  - 3/3 interfaces ✅
```

### Configuração

#### Arquivos Ignorados
- `*.test.ts` - Arquivos de teste
- `*.spec.ts` - Arquivos de spec
- `*.d.ts` - Arquivos de definição
- `index.ts` - Arquivos barrel
- `*.config.*` - Configurações

#### Níveis de Rigor

```yaml
documentation:
  level: strict  # strict | moderate | minimal

  strict:
    - all_exports_documented
    - all_params_documented
    - all_returns_documented
    - examples_for_complex

  moderate:
    - all_exports_documented
    - complex_params_documented

  minimal:
    - public_functions_documented
```

### Arquivo de Regras
`.cursor/rules/hook-documentation.mdc`

---

## Adicionando Novos Hooks

### Estrutura de um Hook

```markdown
# Hook de {Nome}

## Propósito
{Descrição do que o hook faz}

## Quando é Executado
- {Trigger 1}
- {Trigger 2}

## O que Verifica/Faz
{Lista de verificações ou ações}

## Fluxo de Execução
{Diagrama ou passos}

## Output
{Exemplos de output}

## Configuração
{Opções configuráveis}
```

### Integrando ao Sistema

1. Criar arquivo `.cursor/rules/hook-{nome}.mdc`
2. Definir triggers (quando executar)
3. Definir ações (o que fazer)
4. Integrar ao agente apropriado
5. Documentar em `docs/hooks.md`

### Exemplo: Hook de Lint

```markdown
# Hook de Lint

## Propósito
Verificar se código segue padrões de estilo.

## Quando é Executado
- Após cada tarefa concluída
- Antes de commits

## O que Verifica
- ESLint rules
- Prettier formatting
- TypeScript strict mode

## Ações
- Se erros: tentar fix automático
- Se warnings: reportar mas continuar
```
