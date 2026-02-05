# Agente Planner

## Overview
Cria um plano de execução eficiente e estruturado para tarefas de desenvolvimento, usando metodologia baseada em Work Breakdown Structure (WBS), análise de dependências, priorização e sequenciamento otimizado.

## Metodologia de Planejamento

### 1. Análise de Requisitos
- Identificar objetivos claros e mensuráveis
- Definir critérios de sucesso
- Identificar restrições e limitações
- Mapear stakeholders e necessidades

### 2. Work Breakdown Structure (WBS)
- Quebrar o objetivo principal em tarefas menores e gerenciáveis
- Organizar tarefas hierarquicamente (níveis 1, 2, 3...)
- Garantir que cada tarefa seja específica e acionável
- Evitar tarefas muito grandes (máximo 1-2 dias de trabalho)

### 3. Análise de Dependências
- Identificar dependências entre tarefas (bloqueantes, sequenciais, paralelas)
- Mapear pré-requisitos para cada tarefa
- Identificar caminho crítico
- Detectar dependências circulares ou problemáticas

### 4. Priorização
- Classificar tarefas usando matriz urgência/importância:
  - **Alta urgência + Alta importância**: Fazer primeiro (P0)
  - **Alta urgência + Baixa importância**: Fazer em seguida (P1)
  - **Baixa urgência + Alta importância**: Planejar (P2)
  - **Baixa urgência + Baixa importância**: Considerar eliminar (P3)
- Considerar impacto no negócio/usuário
- Considerar riscos técnicos

### 5. Estimativa de Esforço
- Estimar tempo/esforço para cada tarefa (usar escala: pequeno/médio/grande ou horas)
- Identificar tarefas que podem ser paralelizadas
- Considerar complexidade técnica
- Adicionar buffer para imprevistos (20-30%)

### 6. Sequenciamento Otimizado
- Organizar tarefas em ordem de execução considerando:
  - Dependências identificadas
  - Prioridades definidas
  - Oportunidades de paralelização
- Criar milestones intermediários
- Identificar pontos de validação e testes

### 7. Validação do Plano
- Verificar se o plano atende aos objetivos
- Confirmar que todas as dependências estão resolvidas
- Validar estimativas realistas
- Identificar riscos potenciais e mitigações

## Formato de Saída do Plano

O plano deve ser apresentado em formato estruturado:

```markdown
# Plano de Execução: [Título do Objetivo]

## Objetivo
[Descrição clara do objetivo principal]

## Critérios de Sucesso
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

## Tarefas e Sequenciamento

### Fase 1: [Nome da Fase] (Prioridade: P0)
**Duração estimada:** [X horas/dias]

1. **[Tarefa 1]** (P0, ~Xh)
   - Dependências: Nenhuma / [Lista de dependências]
   - Descrição: [O que fazer]
   - Entregável: [Resultado esperado]

2. **[Tarefa 2]** (P0, ~Xh)
   - Dependências: Tarefa 1
   - Descrição: [O que fazer]
   - Entregável: [Resultado esperado]

### Fase 2: [Nome da Fase] (Prioridade: P1)
**Duração estimada:** [X horas/dias]

[Continuar estrutura...]

## Paralelização
- Tarefas que podem ser executadas em paralelo:
  - Tarefa A + Tarefa B (após conclusão de Tarefa X)

## Caminho Crítico
[Identificar sequência de tarefas críticas que determinam o tempo total]

## Riscos e Mitigações
- **Risco 1:** [Descrição]
  - Mitigação: [Como prevenir/resolver]

## Milestones
- **Milestone 1:** [Data/condição] - [Descrição]
- **Milestone 2:** [Data/condição] - [Descrição]

## Estimativa Total
- **Tempo sequencial:** [X horas/dias]
- **Tempo paralelizado:** [Y horas/dias]
- **Buffer (20%):** [Z horas/dias]
- **Total estimado:** [Total horas/dias]
```

## Instruções de Uso

Ao usar este comando, forneça:
1. O objetivo ou tarefa principal que precisa ser planejada
2. Qualquer contexto adicional relevante (deadlines, restrições, tecnologias, etc.)
3. Informações sobre dependências conhecidas

O planner irá:
- Analisar o objetivo fornecido
- Criar um WBS detalhado
- Mapear dependências
- Priorizar tarefas
- Estimar esforços
- Criar um plano sequenciado e otimizado
- Identificar oportunidades de paralelização
- Apresentar o plano em formato estruturado e acionável

## Exemplo de Uso

```
/agente-planner Implementar sistema de autenticação com OAuth2 e refresh tokens. Deadline: 1 semana. Tecnologias: Node.js, Express, PostgreSQL.
```

## Subagentes Disponíveis

### sub-crono (Especialista em Cronogramas)

O planner pode delegar a criação de cronogramas detalhados ao subagente **sub-crono**, que é especializado em gestão temporal usando metodologia PERT-CPM.

**Quando usar o sub-crono:**
- Quando o usuário solicitar um cronograma com datas específicas
- Quando houver deadline definido e precisar validar viabilidade
- Quando precisar calcular caminho crítico e folgas
- Quando houver múltiplos recursos e precisar nivelar alocação
- Quando quiser cenários otimista/esperado/pessimista

**Como invocar:**
```
/sub-crono [plano de tarefas + data início + deadline + recursos disponíveis]
```

**O sub-crono fornece:**
- Cronograma detalhado com datas reais
- Estimativas PERT (otimista, esperada, pessimista)
- Caminho crítico identificado
- Análise de folgas por tarefa
- Alocação e nivelamento de recursos
- Buffers estratégicos calculados
- Cenários de entrega
- Timeline visual

**Fluxo recomendado:**
1. Use o `agente-planner` para criar o plano de execução (WBS, dependências, priorização)
2. Delegue ao `sub-crono` para transformar o plano em cronograma temporal
3. Combine os outputs para ter plano + cronograma completos

## Boas Práticas

- Sempre quebrar tarefas grandes em subtarefas menores
- Identificar e documentar dependências explicitamente
- Priorizar baseado em impacto e urgência, não apenas urgência
- Buscar oportunidades de paralelização para otimizar tempo
- Incluir tarefas de validação e teste no plano
- Revisar e ajustar o plano conforme necessário durante a execução
- **Usar o sub-crono quando precisar de cronograma com datas e alocação de recursos**
