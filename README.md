# Hyper Multi-Agents

Sistema multi-agente para programação assistida por IA, implementando um workflow completo de desenvolvimento de software.

## Visão Geral

Este sistema automatiza o ciclo de desenvolvimento de software através de agentes especializados que trabalham em conjunto, desde a criação de issues até o merge do código.

```
┌─────────────────────────────────────────────────────────────────┐
│                         WORKFLOW                                 │
│                                                                  │
│   /issue  →  /start  →  /plan  →  /execute  →  /test  →  /pr   │
│                            ↓                                     │
│                     Sub-Agentes                                  │
│              @dev-backend  @dev-frontend                         │
│              @dev-database @dev-test                             │
│              @dev-infra    @dev-docs                             │
│                                                                  │
│   Após review aprovado:  /merge                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

```bash
# 1. Criar uma issue
/issue Implementar sistema de autenticação com JWT

# 2. Iniciar trabalho na issue
/start 42

# 3. Criar plano de execução
/plan 42

# 4. Executar implementação
/execute 42

# 5. Rodar testes
/test 42

# 6. Criar Pull Request
/pr 42

# 7. Fazer merge (após aprovação)
/merge 42
```

## Estrutura do Projeto

```
.cursor/
├── rules/
│   ├── agent-*.mdc           # Agentes principais
│   ├── subagent-*.mdc        # Sub-agentes especialistas
│   ├── hook-*.mdc            # Hooks automáticos
│   └── commands/             # Documentação dos commands
docs/
├── README.md                 # Documentação principal
├── architecture.md           # Arquitetura do sistema
├── agents.md                 # Guia dos agentes
├── subagents.md              # Guia dos sub-agentes
├── commands.md               # Referência de commands
└── hooks.md                  # Documentação dos hooks
```

## Agentes

| Agente | Command | Propósito |
|--------|---------|-----------|
| ISSUE | `/issue` | Criar issues estruturadas |
| START | `/start` | Iniciar trabalho (branch + docs) |
| PLAN | `/plan` | Criar plano de execução |
| EXECUTION | `/execute` | Implementar código |
| TEST | `/test` | Validar com testes |
| PR | `/pr` | Criar Pull Request |
| MERGE | `/merge` | Finalizar merge |

## Sub-Agentes

| Sub-Agente | Especialização |
|------------|----------------|
| @dev-backend | APIs, serviços, lógica de negócio |
| @dev-frontend | UI, componentes, interações |
| @dev-database | Schemas, migrations, queries |
| @dev-test | Testes unitários e integração |
| @dev-infra | CI/CD, Docker, deploy |
| @dev-docs | Documentação técnica |

## Documentação Completa

Consulte a pasta `docs/` para documentação detalhada:

- [Arquitetura](docs/architecture.md) - Design do sistema
- [Agentes](docs/agents.md) - Detalhes de cada agente
- [Sub-Agentes](docs/subagents.md) - Especialistas disponíveis
- [Commands](docs/commands.md) - Referência completa
- [Hooks](docs/hooks.md) - Automações

## Licença

MIT
