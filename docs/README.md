# Hyper Multi-Agents System

Sistema multi-agente para programação assistida por IA, implementando um workflow completo de desenvolvimento de software.

## Visão Geral

Este sistema automatiza o ciclo de desenvolvimento de software através de agentes especializados que trabalham em conjunto, desde a criação de issues até o merge do código.

```
┌─────────────────────────────────────────────────────────────────┐
│                         WORKFLOW                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   /issue    →   /start   →   /plan   →   /execute   →   /test  │
│      │            │           │            │              │      │
│      ▼            ▼           ▼            ▼              ▼      │
│   [ISSUE]     [START]     [PLAN]     [EXECUTION]      [TEST]    │
│                                           │                      │
│                                           ▼                      │
│                                    ┌──────────────┐              │
│                                    │ Sub-Agentes  │              │
│                                    ├──────────────┤              │
│                                    │ @dev-backend │              │
│                                    │ @dev-frontend│              │
│                                    │ @dev-database│              │
│                                    │ @dev-test    │              │
│                                    │ @dev-infra   │              │
│                                    │ @dev-docs    │              │
│                                    └──────────────┘              │
│                                                                  │
│   /test   →   /pr   →   /merge                                  │
│      │         │          │                                      │
│      ▼         ▼          ▼                                      │
│   [TEST]    [PR]      [MERGE]                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Criar uma Issue
```
/issue Implementar sistema de autenticação com JWT
```

### 2. Iniciar Trabalho
```
/start 42
```

### 3. Criar Plano
```
/plan 42
```

### 4. Executar Implementação
```
/execute 42
```

### 5. Rodar Testes
```
/test 42
```

### 6. Criar Pull Request
```
/pr 42
```

### 7. Fazer Merge
```
/merge 42
```

## Documentação

- [Arquitetura do Sistema](./architecture.md)
- [Guia dos Agentes](./agents.md)
- [Guia dos Sub-Agentes](./subagents.md)
- [Referência de Commands](./commands.md)
- [Hooks](./hooks.md)

## Estrutura de Arquivos

```
.cursor/
├── rules/
│   ├── agent-issue.mdc        # Agente de criação de issues
│   ├── agent-start.mdc        # Agente de início de trabalho
│   ├── agent-plan.mdc         # Agente de planejamento
│   ├── agent-execution.mdc    # Agente de execução
│   ├── agent-test.mdc         # Agente de testes
│   ├── agent-pr.mdc           # Agente de Pull Request
│   ├── agent-merge.mdc        # Agente de merge
│   ├── subagent-dev-backend.mdc   # Especialista backend
│   ├── subagent-dev-frontend.mdc  # Especialista frontend
│   ├── subagent-dev-database.mdc  # Especialista database
│   ├── subagent-dev-test.mdc      # Especialista testes
│   ├── subagent-dev-infra.mdc     # Especialista infra
│   ├── subagent-dev-docs.mdc      # Especialista docs
│   ├── hook-documentation.mdc     # Hook de documentação
│   └── commands/
│       ├── issue.md
│       ├── start.md
│       ├── plan.md
│       ├── execute.md
│       ├── test.md
│       ├── pr.md
│       └── merge.md
├── docs/
│   ├── README.md              # Este arquivo
│   ├── architecture.md        # Arquitetura do sistema
│   ├── agents.md              # Documentação dos agentes
│   ├── subagents.md           # Documentação dos sub-agentes
│   ├── commands.md            # Referência de commands
│   └── hooks.md               # Documentação dos hooks
└── issues/                    # Pasta criada por issue
    └── issue-{numero}/
        ├── CONTEXT.md
        ├── ARCHITECTURE.md
        ├── PLAN.md
        ├── PROGRESS.md
        ├── TEST_REPORT.md
        └── NOTES.md
```

## Fluxo Completo

```mermaid
graph TD
    A[Usuário descreve tarefa] -->|/issue| B[Issue Criada]
    B -->|/start| C[Branch + Estrutura]
    C -->|/plan| D[Plano Criado]
    D -->|/execute| E[Código Implementado]
    E --> F{Hook Docs}
    F --> G[Documentação OK]
    G -->|/test| H{Testes}
    H -->|Passou| I[/pr]
    H -->|Falhou| J[Correção Auto]
    J --> H
    I --> K[PR Criado]
    K -->|Review OK| L[/merge]
    L --> M{Conflitos?}
    M -->|Não| N[Merge OK]
    M -->|Simples| O[Auto-resolve]
    O --> N
    M -->|Complexo| P[Pergunta Usuário]
    P --> N
    N --> Q[Issue Fechada]
```

## Licença

MIT
