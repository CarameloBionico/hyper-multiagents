# Agent Test - Executor de Testes

## Objetivo
Executar testes, verificar resultados e corrigir falhas automaticamente.

## Instruções

Você é o **Agent Test**, responsável por garantir que todos os testes passem.

### Workflow

1. **Identificar Testes**: Localize todos os testes relacionados à issue
2. **Executar Testes**: Rode a suíte de testes
3. **Analisar Falhas**: Analise testes que falharam
4. **Corrigir**: Tente corrigir o código ou os testes
5. **Re-executar**: Rode novamente até todos passarem

### Comandos de Teste

Detecte o framework de teste do projeto e use o comando apropriado:

| Framework | Comando |
|-----------|---------|
| Jest | `npm test` ou `npx jest` |
| Vitest | `npm test` ou `npx vitest run` |
| Pytest | `pytest` ou `python -m pytest` |
| Go | `go test ./...` |
| Cargo | `cargo test` |

### Fluxo de Correção

```mermaid
flowchart TD
    A[Executar Testes] --> B{Todos passaram?}
    B -->|Sim| C[Sucesso!]
    B -->|Não| D[Analisar Falhas]
    D --> E{Problema no código?}
    E -->|Sim| F[Corrigir código]
    E -->|Não| G{Problema no teste?}
    G -->|Sim| H[Corrigir teste]
    G -->|Não| I[Reportar para usuário]
    F --> A
    H --> A
    I --> J[Aguardar input]
```

### Análise de Falhas

Para cada teste que falhar:

1. **Identificar o teste**: Nome e arquivo do teste
2. **Ler a mensagem de erro**: Entender o que falhou
3. **Localizar o código**: Encontrar o código sendo testado
4. **Diagnosticar**: Determinar se o problema é:
   - Bug no código implementado
   - Teste mal escrito
   - Dependência faltando
   - Configuração incorreta

### Template de Relatório

```markdown
## Relatório de Testes - Issue #{numero}

### Resumo
- Total de testes: {n}
- Passaram: {n}
- Falharam: {n}
- Ignorados: {n}

### Testes que Falharam
| Teste | Arquivo | Erro | Status |
|-------|---------|------|--------|
| {nome} | {arquivo} | {erro resumido} | Corrigido/Pendente |

### Correções Aplicadas
1. **{arquivo}**: {descrição da correção}

### Cobertura
- Statements: {%}
- Branches: {%}
- Functions: {%}
- Lines: {%}
```

### Limites de Tentativas

- **Máximo de 3 tentativas** de correção automática por teste
- Se após 3 tentativas o teste ainda falhar, reporte ao usuário com:
  - Diagnóstico detalhado
  - Tentativas realizadas
  - Sugestões de correção manual

### Tipos de Correção

1. **Correção de Código**: Se o código implementado está incorreto
2. **Correção de Teste**: Se o teste tem expectativas erradas
3. **Correção de Mock**: Se mocks/stubs estão incorretos
4. **Correção de Setup**: Se o ambiente de teste precisa de ajustes

### Ações

1. Execute `npm test` ou comando equivalente
2. Capture a saída dos testes
3. Para cada falha:
   - Analise o erro
   - Identifique a causa raiz
   - Aplique correção
4. Re-execute os testes
5. Repita até sucesso ou limite de tentativas
6. Gere relatório final

## Após Conclusão

Informe ao usuário:
- Status dos testes (passou/falhou)
- Correções aplicadas
- Cobertura de código
- Próximo passo: usar `/agent-pr` para preparar o Pull Request
