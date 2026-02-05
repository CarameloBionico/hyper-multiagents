# Referência de Sub-agentes

## Visão Geral

Sub-agentes são especialistas em domínios específicos. Eles são invocados pelo `agent-execute` baseado nas tags no PLAN.md ou podem ser chamados diretamente.

## dev-backend

**Especialidade**: Desenvolvimento server-side

**Quando usar**:
- APIs REST/GraphQL
- Serviços e lógica de negócio
- Autenticação/autorização
- Integrações com serviços externos

**Padrões**:
- SOLID principles
- Error handling estruturado
- Logging apropriado
- Input validation

**Exemplo de invocação**:
```
/dev-backend Criar endpoint POST /api/users com validação
```

---

## dev-frontend

**Especialidade**: Interfaces de usuário

**Quando usar**:
- Componentes React/Vue/Angular
- Estilos e CSS
- State management
- Formulários e validação client-side

**Padrões**:
- Atomic design
- Acessibilidade (a11y)
- Responsive design
- Performance (lazy loading, memoization)

**Exemplo de invocação**:
```
/dev-frontend Criar componente de modal de confirmação acessível
```

---

## dev-database

**Especialidade**: Modelagem e operações de dados

**Quando usar**:
- Design de schemas
- Migrations
- Queries otimizadas
- Índices

**Padrões**:
- Normalização adequada
- Migrations reversíveis
- Indexes strategy
- Data integrity

**Exemplo de invocação**:
```
/dev-database Criar migration para tabela de orders com relacionamentos
```

---

## dev-test

**Especialidade**: Testes automatizados

**Quando usar**:
- Testes unitários
- Testes de integração
- Mocks e stubs
- Coverage analysis

**Padrões**:
- AAA pattern (Arrange, Act, Assert)
- Test isolation
- Edge cases coverage
- Meaningful test names

**Exemplo de invocação**:
```
/dev-test Criar testes unitários para UserService
```

---

## dev-docs

**Especialidade**: Documentação de código

**Quando usar**:
- JSDoc/TSDoc comments
- README updates
- API documentation
- Inline comments

**Padrões**:
- Google Style Guide
- Clear and concise
- Examples included
- All public APIs documented

**Exemplo de invocação**:
```
/dev-docs Documentar todos os métodos públicos em src/services/
```

---

## Criando Novos Sub-agentes

Para criar um novo sub-agente, adicione um arquivo em `.cursor/agents/`:

```markdown
---
name: nome-do-agente
description: Descrição clara de quando usar este agente.
model: inherit  # ou 'fast' para tarefas simples
---

# Título do Especialista

Você é um especialista em [área].

## Expertise Areas
- Área 1
- Área 2

## When Invoked
1. Passo 1
2. Passo 2

## Output Format
Descreva o formato esperado de saída.
```

### Campos do Frontmatter

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `name` | Não | Nome único do agente (usa nome do arquivo se omitido) |
| `description` | Não | Descrição de quando usar (ajuda na delegação automática) |
| `model` | Não | `inherit`, `fast`, ou modelo específico |
| `readonly` | Não | `true` para restringir escrita |
| `is_background` | Não | `true` para rodar em background |
