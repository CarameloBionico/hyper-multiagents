# Guia dos Agentes

Este documento descreve cada agente do sistema, suas responsabilidades e como funcionam.

## Visão Geral

| Agente | Propósito | Command | Output Principal |
|--------|-----------|---------|------------------|
| ISSUE | Criar issues estruturadas | `/issue` | Issue no GitHub |
| START | Iniciar trabalho | `/start` | Branch + estrutura |
| PLAN | Criar plano de execução | `/plan` | PLAN.md |
| EXECUTION | Implementar código | `/execute` | Código funcional |
| TEST | Validar implementação | `/test` | TEST_REPORT.md |
| PR | Criar Pull Request | `/pr` | PR no GitHub |
| MERGE | Finalizar entrega | `/merge` | Código em main |

---

## Agente ISSUE

### Propósito
Transformar descrições do usuário em issues estruturadas e organizadas no GitHub.

### Responsabilidades
- Analisar descrição fornecida
- Identificar tipo de tarefa (feature, bug, refactor)
- Estruturar com título, descrição, labels
- Definir critérios de aceite claros
- Criar issue no repositório

### Input
```
/issue Criar sistema de autenticação com JWT e refresh tokens
```

### Output
- Issue criada no GitHub
- Número da issue para próximos passos

### Arquivo de Regras
`.cursor/rules/agent-issue.mdc`

---

## Agente START

### Propósito
Preparar ambiente de trabalho para uma issue, criando branch e documentação inicial.

### Responsabilidades
- Criar branch seguindo padrão de nomenclatura
- Criar pasta da issue com estrutura padrão
- Documentar contexto da issue
- Propor arquitetura inicial
- Inicializar log de progresso

### Input
```
/start 42
```

### Output
- Branch: `issue-42/feature-auth-jwt`
- Pasta: `issues/issue-42/`
- Arquivos: CONTEXT.md, ARCHITECTURE.md, PROGRESS.md, NOTES.md

### Estrutura Criada
```
issues/issue-42/
├── CONTEXT.md      # Requisitos e escopo
├── ARCHITECTURE.md # Proposta de solução
├── PROGRESS.md     # Log de atividades
└── NOTES.md        # Anotações livres
```

### Arquivo de Regras
`.cursor/rules/agent-start.mdc`

---

## Agente PLAN

### Propósito
Criar plano de execução detalhado com tarefas atômicas e atribuições claras.

### Responsabilidades
- Analisar contexto e arquitetura
- Quebrar em tarefas de 15-30 minutos
- Atribuir a sub-agentes especialistas
- Definir ordem e dependências
- Especificar testes necessários

### Input
```
/plan 42
```

### Output
- Arquivo `PLAN.md` com checklist completo
- Dependências mapeadas
- Critérios de conclusão

### Exemplo de PLAN.md
```markdown
## Checklist de Implementação

### Fase 1: Preparação
- [ ] 1.1 Configurar estrutura de autenticação @dev-backend
- [ ] 1.2 Criar tabela de tokens @dev-database

### Fase 2: Backend
- [ ] 2.1 Implementar AuthService @dev-backend
- [ ] 2.2 Criar middleware de autenticação @dev-backend
- [ ] 2.3 Endpoints login/logout/refresh @dev-backend

### Fase 3: Testes
- [ ] 3.1 Testes unitários AuthService @dev-test
- [ ] 3.2 Testes de integração API @dev-test
```

### Arquivo de Regras
`.cursor/rules/agent-plan.mdc`

---

## Agente EXECUTION

### Propósito
Executar o plano de implementação coordenando sub-agentes especialistas.

### Responsabilidades
- Ler e interpretar PLAN.md
- Chamar sub-agentes apropriados
- Verificar conclusão de cada tarefa
- Executar hook de documentação
- Fazer commits incrementais
- Atualizar progresso

### Input
```
/execute 42
```

### Fluxo por Tarefa
1. Identificar próxima tarefa pendente
2. Preparar contexto para sub-agente
3. Executar sub-agente
4. Verificar resultado (compila, linter)
5. Executar hook de documentação
6. Commit da tarefa
7. Marcar como concluída
8. Atualizar PROGRESS.md

### Sub-agentes Utilizados
| Sub-agente | Especialização |
|------------|----------------|
| @dev-backend | APIs, serviços, lógica |
| @dev-frontend | UI, componentes |
| @dev-database | Schemas, queries |
| @dev-test | Testes |
| @dev-infra | CI/CD, configs |
| @dev-docs | Documentação |

### Arquivo de Regras
`.cursor/rules/agent-execution.mdc`

---

## Agente TEST

### Propósito
Executar testes e garantir qualidade da implementação.

### Responsabilidades
- Executar testes unitários
- Executar testes de integração
- Analisar cobertura
- Tentar correções automáticas
- Gerar relatório de testes

### Input
```
/test 42
```

### Output
- `TEST_REPORT.md` com resultados
- Correções aplicadas (se possível)
- Status de aprovação/reprovação

### Critérios de Sucesso
```yaml
testes_unitarios:
  passando: 100%
  cobertura: >= 80%

testes_integracao:
  passando: 100%
```

### Correção Automática
- Máximo 3 tentativas por teste
- Análise de causa raiz
- Aplicação de fix
- Re-execução para validar

### Arquivo de Regras
`.cursor/rules/agent-test.mdc`

---

## Agente PR

### Propósito
Criar Pull Request completo e bem documentado.

### Responsabilidades
- Compilar todas as mudanças
- Verificar pré-requisitos
- Gerar descrição detalhada
- Criar checklist de qualidade
- Criar PR no GitHub
- Solicitar reviewers

### Input
```
/pr 42
```

### Output
- Pull Request no GitHub
- Descrição estruturada
- Labels apropriadas
- Reviewers atribuídos

### Estrutura do PR
```markdown
## 📋 Descrição
[Resumo das mudanças]

## 🎯 Tipo de Mudança
- [x] ✨ Nova funcionalidade

## 📝 Mudanças Realizadas
[Tabela de arquivos]

## 🧪 Testes
[Métricas de cobertura]

## ✅ Checklist
[Itens de qualidade]
```

### Arquivo de Regras
`.cursor/rules/agent-pr.mdc`

---

## Agente MERGE

### Propósito
Finalizar entrega fazendo merge do PR aprovado.

### Responsabilidades
- Verificar aprovações
- Verificar CI/CD
- Atualizar branch com main
- Resolver conflitos (quando possível)
- Executar merge
- Fechar issue
- Limpar branch

### Input
```
/merge 42
```

### Resolução de Conflitos

| Tipo | Ação |
|------|------|
| Whitespace | Auto-resolve |
| Imports | Auto-resolve |
| Mudanças independentes | Auto-resolve com cuidado |
| Lógica de negócio | Perguntar ao usuário |
| Estrutural | Perguntar ao usuário |

### Estratégias de Merge
- **Squash** (padrão): Combina commits em um
- **Merge commit**: Preserva histórico
- **Rebase**: Histórico linear

### Arquivo de Regras
`.cursor/rules/agent-merge.mdc`

---

## Ciclo de Vida Completo

```
[Descrição do usuário]
         │
         ▼
     ┌───────┐
     │ ISSUE │ ──► Issue #42 criada
     └───┬───┘
         │
         ▼
     ┌───────┐
     │ START │ ──► Branch + estrutura
     └───┬───┘
         │
         ▼
     ┌──────┐
     │ PLAN │ ──► PLAN.md com checklist
     └───┬──┘
         │
         ▼
   ┌───────────┐
   │ EXECUTION │ ──► Código implementado
   └─────┬─────┘
         │
         ▼
     ┌──────┐
     │ TEST │ ──► Testes validados
     └───┬──┘
         │
         ▼
     ┌────┐
     │ PR │ ──► PR criado
     └──┬─┘
         │
    [Review]
         │
         ▼
     ┌───────┐
     │ MERGE │ ──► Código em main
     └───────┘
         │
         ▼
   [Issue fechada]
```
