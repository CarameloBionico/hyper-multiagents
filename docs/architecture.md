# Arquitetura do Sistema Multi-Agente

## Visão Geral

O sistema é composto por três camadas principais:

1. **Camada de Commands** - Interface com o usuário
2. **Camada de Agentes** - Orquestração do workflow
3. **Camada de Sub-Agentes** - Execução especializada

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE COMMANDS                        │
│  /issue  /start  /plan  /execute  /test  /pr  /merge        │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE AGENTES                         │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │
│  │  ISSUE  │→ │  START  │→ │  PLAN   │→ │   EXECUTION     │ │
│  └─────────┘  └─────────┘  └─────────┘  └────────┬────────┘ │
│                                                   │          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │          │
│  │  MERGE  │← │   PR    │← │  TEST   │←──────────┘          │
│  └─────────┘  └─────────┘  └─────────┘                      │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  CAMADA DE SUB-AGENTES                       │
│                                                              │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │ dev-backend  │  │ dev-frontend  │  │   dev-database   │  │
│  └──────────────┘  └───────────────┘  └──────────────────┘  │
│                                                              │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │   dev-test   │  │   dev-infra   │  │    dev-docs      │  │
│  └──────────────┘  └───────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Componentes

### 1. Commands (Interface)

Os commands são a interface entre o usuário e o sistema. Cada command aciona um agente específico.

| Command | Agente | Propósito |
|---------|--------|-----------|
| `/issue` | ISSUE | Criar issue no GitHub |
| `/start` | START | Iniciar trabalho (branch, estrutura) |
| `/plan` | PLAN | Criar plano de execução |
| `/execute` | EXECUTION | Executar implementação |
| `/test` | TEST | Rodar e validar testes |
| `/pr` | PR | Criar Pull Request |
| `/merge` | MERGE | Fazer merge do PR |

### 2. Agentes (Orquestração)

Os agentes são responsáveis por coordenar o workflow e garantir que cada etapa seja completada corretamente.

#### Fluxo de Dados

```
Issue (GitHub)
    │
    ▼
┌─────────────────┐
│ issues/issue-N/ │
├─────────────────┤
│ CONTEXT.md      │ ← START (cria)
│ ARCHITECTURE.md │ ← START (cria)
│ PLAN.md         │ ← PLAN (cria)
│ PROGRESS.md     │ ← Todos (atualizam)
│ TEST_REPORT.md  │ ← TEST (cria)
│ NOTES.md        │ ← Opcional
└─────────────────┘
```

#### Responsabilidades

| Agente | Input | Output | Próximo |
|--------|-------|--------|---------|
| ISSUE | Descrição do usuário | Issue no GitHub | START |
| START | Número da issue | Branch + estrutura | PLAN |
| PLAN | CONTEXT + ARCHITECTURE | PLAN.md (checklist) | EXECUTION |
| EXECUTION | PLAN.md | Código implementado | TEST |
| TEST | Código | TEST_REPORT.md | PR |
| PR | Tudo documentado | Pull Request | MERGE |
| MERGE | PR aprovado | Código em main | - |

### 3. Sub-Agentes (Especialização)

Os sub-agentes são especialistas em domínios específicos, chamados pelo agente EXECUTION.

```
EXECUTION
    │
    ├──► @dev-backend   ─── APIs, serviços, lógica
    │
    ├──► @dev-frontend  ─── UI, componentes, UX
    │
    ├──► @dev-database  ─── Schemas, migrations, queries
    │
    ├──► @dev-test      ─── Testes unitários/integração
    │
    ├──► @dev-infra     ─── CI/CD, Docker, deploy
    │
    └──► @dev-docs      ─── Documentação técnica
```

### 4. Hooks (Automação)

Hooks são ações automáticas executadas em momentos específicos.

#### Hook de Documentação

```
┌─────────────────────────────────────────┐
│            Hook de Documentação          │
├─────────────────────────────────────────┤
│                                          │
│  Tarefa Concluída                        │
│        │                                 │
│        ▼                                 │
│  ┌───────────────────┐                   │
│  │ Identificar       │                   │
│  │ arquivos mudados  │                   │
│  └─────────┬─────────┘                   │
│            │                             │
│            ▼                             │
│  ┌───────────────────┐                   │
│  │ Verificar         │                   │
│  │ documentação      │                   │
│  └─────────┬─────────┘                   │
│            │                             │
│       ┌────┴────┐                        │
│       │         │                        │
│       ▼         ▼                        │
│   [Completa] [Faltando]                  │
│       │         │                        │
│       │         ▼                        │
│       │  ┌─────────────┐                 │
│       │  │ Gerar docs  │                 │
│       │  │ (@dev-docs) │                 │
│       │  └──────┬──────┘                 │
│       │         │                        │
│       └────┬────┘                        │
│            │                             │
│            ▼                             │
│      [Prosseguir]                        │
│                                          │
└─────────────────────────────────────────┘
```

## Fluxo de Execução Detalhado

### Fase 1: Criação (ISSUE → START)

```
Usuário: "Criar API de produtos"
           │
           ▼
┌─────────────────────────────────────┐
│ ISSUE                               │
│ • Analisa descrição                 │
│ • Estrutura issue                   │
│ • Cria no GitHub                    │
│ • Retorna: Issue #42                │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ START                               │
│ • Busca detalhes da #42             │
│ • Cria branch issue-42/feature-api  │
│ • Cria issues/issue-42/             │
│ • Documenta contexto                │
│ • Propõe arquitetura                │
└─────────────────────────────────────┘
```

### Fase 2: Planejamento (PLAN)

```
┌─────────────────────────────────────┐
│ PLAN                                │
│ • Lê CONTEXT.md                     │
│ • Lê ARCHITECTURE.md                │
│ • Quebra em tarefas atômicas        │
│ • Atribui a sub-agentes             │
│ • Gera PLAN.md com checklist        │
└─────────────────────────────────────┘

PLAN.md:
├── Fase 1: Preparação
│   └── 1.1 Criar estrutura @dev-backend
├── Fase 2: Backend
│   ├── 2.1 Criar modelo @dev-database
│   ├── 2.2 Criar service @dev-backend
│   └── 2.3 Criar rotas @dev-backend
├── Fase 3: Testes
│   └── 3.1 Testes unitários @dev-test
└── Fase 4: Docs
    └── 4.1 Documentar API @dev-docs
```

### Fase 3: Implementação (EXECUTION)

```
┌─────────────────────────────────────────────────────────┐
│ EXECUTION                                               │
│                                                         │
│  Para cada tarefa no PLAN.md:                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 1. Identificar sub-agente                       │   │
│  │ 2. Preparar contexto                            │   │
│  │ 3. Executar sub-agente                          │   │
│  │ 4. Verificar resultado                          │   │
│  │ 5. Executar hook de documentação                │   │
│  │ 6. Commit                                       │   │
│  │ 7. Atualizar PLAN.md (✓) e PROGRESS.md          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Fase 4: Validação (TEST)

```
┌─────────────────────────────────────────────────────────┐
│ TEST                                                    │
│                                                         │
│  1. Executar testes unitários                          │
│  2. Executar testes de integração                      │
│  3. Analisar resultados                                │
│                                                         │
│     ┌─────────────────┐                                │
│     │ Testes passaram │──────► Gerar TEST_REPORT.md    │
│     └────────┬────────┘                                │
│              │                                          │
│     ┌────────▼────────┐                                │
│     │ Testes falharam │                                │
│     └────────┬────────┘                                │
│              │                                          │
│     ┌────────▼────────┐                                │
│     │ Tentar correção │ (máx 3x)                       │
│     └────────┬────────┘                                │
│              │                                          │
│         ┌────┴────┐                                    │
│         │         │                                    │
│    [Corrigido] [Falhou]                               │
│         │         │                                    │
│         │    [Escalar para usuário]                   │
│         │                                              │
│         ▼                                              │
│    [Prosseguir para PR]                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Fase 5: Entrega (PR → MERGE)

```
┌─────────────────────────────────────────────────────────┐
│ PR                                                      │
│                                                         │
│  1. Compilar todas as mudanças                         │
│  2. Verificar branch atualizado                        │
│  3. Gerar descrição do PR                              │
│  4. Criar PR no GitHub                                 │
│  5. Solicitar reviewers                                │
│                                                         │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
                    [Aguardar Review]
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ MERGE                                                   │
│                                                         │
│  1. Verificar aprovação                                │
│  2. Verificar CI/CD                                    │
│  3. Atualizar branch                                   │
│                                                         │
│     ┌─────────────────┐                                │
│     │ Conflitos?      │                                │
│     └────────┬────────┘                                │
│              │                                          │
│         ┌────┴────┐                                    │
│         │         │                                    │
│      [Não]    [Sim]                                   │
│         │         │                                    │
│         │    ┌────┴────┐                              │
│         │    │         │                              │
│         │ [Simples] [Complexo]                        │
│         │    │         │                              │
│         │ [Auto]  [Perguntar]                         │
│         │    │         │                              │
│         └────┴────┬────┘                              │
│                   │                                    │
│                   ▼                                    │
│            [Squash Merge]                             │
│                   │                                    │
│                   ▼                                    │
│            [Fechar Issue]                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Comunicação entre Componentes

### Arquivos como Interface

Os agentes se comunicam através de arquivos Markdown estruturados:

```
CONTEXT.md ────────► PLAN.md
ARCHITECTURE.md ───┘    │
                        │
                        ▼
                   PROGRESS.md
                        │
                        ▼
                  TEST_REPORT.md
                        │
                        ▼
                    PR Description
```

### Padrão de Handoff

Cada agente:
1. **Lê** arquivos do agente anterior
2. **Processa** conforme suas regras
3. **Gera** novos arquivos ou atualiza existentes
4. **Confirma** conclusão
5. **Sugere** próximo passo

## Extensibilidade

### Adicionando Novos Sub-Agentes

1. Criar arquivo `.cursor/rules/subagent-{nome}.mdc`
2. Definir especialização e padrões
3. Atualizar agente EXECUTION para reconhecer
4. Documentar em `docs/subagents.md`

### Adicionando Novos Hooks

1. Criar arquivo `.cursor/rules/hook-{nome}.mdc`
2. Definir trigger e ações
3. Integrar ao agente apropriado
4. Documentar em `docs/hooks.md`

### Adicionando Novos Commands

1. Criar arquivo `.cursor/rules/commands/{nome}.md`
2. Definir uso e fluxo
3. Criar agente se necessário
4. Documentar em `docs/commands.md`
