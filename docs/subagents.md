# Guia dos Sub-Agentes

Os sub-agentes são especialistas em domínios específicos, chamados pelo agente EXECUTION durante a implementação.

## Visão Geral

| Sub-agente | Especialização | Quando usar |
|------------|----------------|-------------|
| @dev-backend | Backend, APIs, lógica | Serviços, endpoints, regras de negócio |
| @dev-frontend | Frontend, UI | Componentes, páginas, interações |
| @dev-database | Banco de dados | Schemas, migrations, queries |
| @dev-test | Testes | Unitários, integração, e2e |
| @dev-infra | Infraestrutura | CI/CD, Docker, deploy |
| @dev-docs | Documentação | JSDoc, README, OpenAPI |

---

## @dev-backend

### Especialização
Desenvolvimento de backend, APIs REST/GraphQL, serviços e lógica de negócio.

### Responsabilidades
- Criar e manter APIs
- Implementar serviços e lógica de negócio
- Desenvolver middlewares
- Configurar validações e tratamento de erros
- Implementar autenticação/autorização

### Stack Comum
- **Node.js**: Express, Fastify, NestJS
- **Python**: FastAPI, Django, Flask
- **Go**: Gin, Echo, Fiber

### Padrões Seguidos
- Validação de input com schemas
- Tratamento de erros padronizado
- Separação de responsabilidades (Controller → Service → Repository)
- Injeção de dependências

### Exemplo de Output
```typescript
// src/services/product.service.ts
export class ProductService {
  async create(data: CreateProductDTO): Promise<Product> {
    // Validação, lógica de negócio, persistência
  }
}
```

### Arquivo de Regras
`.cursor/rules/subagent-dev-backend.mdc`

---

## @dev-frontend

### Especialização
Desenvolvimento de interfaces, componentes de UI e experiência do usuário.

### Responsabilidades
- Criar componentes reutilizáveis
- Implementar layouts responsivos
- Gerenciar estado da aplicação
- Integrar com APIs backend
- Garantir acessibilidade

### Stack Comum
- **React**: Next.js, React Query, Tailwind
- **Vue**: Nuxt, Pinia, Tailwind
- **Svelte**: SvelteKit

### Padrões Seguidos
- Componentes com props tipadas
- Estados de loading/error/empty
- Mobile-first responsivo
- Acessibilidade (a11y)

### Exemplo de Output
```tsx
// src/components/ProductCard.tsx
export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-lg shadow-md p-4">
      {/* UI do produto */}
    </div>
  );
}
```

### Arquivo de Regras
`.cursor/rules/subagent-dev-frontend.mdc`

---

## @dev-database

### Especialização
Design de schemas, migrations, queries otimizadas e integridade de dados.

### Responsabilidades
- Projetar schemas de banco de dados
- Criar e gerenciar migrations
- Escrever queries otimizadas
- Implementar índices apropriados
- Garantir integridade referencial

### Stack Comum
- **SQL**: PostgreSQL, MySQL
- **ORM**: Prisma, TypeORM, SQLAlchemy
- **NoSQL**: MongoDB, Redis

### Padrões Seguidos
- Chaves primárias UUID/CUID
- Timestamps (created_at, updated_at)
- Soft delete quando apropriado
- Índices para queries frequentes

### Exemplo de Output
```prisma
// prisma/schema.prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  price     Decimal
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([name])
}
```

### Arquivo de Regras
`.cursor/rules/subagent-dev-database.mdc`

---

## @dev-test

### Especialização
Criação e manutenção de testes automatizados.

### Responsabilidades
- Escrever testes unitários
- Criar testes de integração
- Configurar mocks e fixtures
- Garantir cobertura adequada
- Implementar testes e2e quando necessário

### Stack Comum
- **JS/TS**: Jest, Vitest, Testing Library
- **Python**: pytest
- **E2E**: Playwright, Cypress

### Padrões Seguidos
- AAA (Arrange, Act, Assert)
- Mocking de dependências externas
- Cobertura mínima de 80%
- Testes independentes e isolados

### Exemplo de Output
```typescript
// tests/unit/product.service.test.ts
describe('ProductService', () => {
  it('should create a product', async () => {
    // Arrange
    const data = { name: 'Test', price: 100 };
    
    // Act
    const result = await service.create(data);
    
    // Assert
    expect(result.name).toBe('Test');
  });
});
```

### Arquivo de Regras
`.cursor/rules/subagent-dev-test.mdc`

---

## @dev-infra

### Especialização
Configuração de infraestrutura, CI/CD e deploy.

### Responsabilidades
- Configurar pipelines de CI/CD
- Criar Dockerfiles e docker-compose
- Configurar ambientes (dev, staging, prod)
- Gerenciar variáveis de ambiente
- Implementar deploy automatizado

### Stack Comum
- **CI/CD**: GitHub Actions, GitLab CI
- **Containers**: Docker, Kubernetes
- **Cloud**: AWS, GCP, Vercel

### Padrões Seguidos
- Multi-stage Docker builds
- Usuário não-root em containers
- Secrets seguros (não commitados)
- Ambientes separados

### Exemplo de Output
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
```

### Arquivo de Regras
`.cursor/rules/subagent-dev-infra.mdc`

---

## @dev-docs

### Especialização
Criação e manutenção de documentação técnica.

### Responsabilidades
- Documentar código com JSDoc/docstrings
- Criar e manter READMEs
- Documentar APIs (OpenAPI/Swagger)
- Escrever guias de contribuição
- Manter changelog

### Stack Comum
- **Code**: JSDoc, TSDoc, docstrings
- **API**: OpenAPI, Swagger
- **Geral**: Markdown, Mermaid

### Padrões Seguidos
- Funções públicas documentadas
- Parâmetros e retornos descritos
- Exemplos de uso incluídos
- Erros documentados

### Exemplo de Output
```typescript
/**
 * Cria um novo produto no sistema.
 *
 * @param data - Dados do produto
 * @param data.name - Nome do produto
 * @param data.price - Preço em centavos
 * @returns Produto criado
 * @throws {ValidationError} Se dados inválidos
 *
 * @example
 * const product = await createProduct({
 *   name: 'Widget',
 *   price: 1999
 * });
 */
```

### Arquivo de Regras
`.cursor/rules/subagent-dev-docs.mdc`

---

## Atribuição de Tarefas

O agente EXECUTION atribui tarefas baseado no tipo:

| Tipo de Tarefa | Sub-agente |
|----------------|------------|
| API, endpoint, serviço | @dev-backend |
| Componente, página, UI | @dev-frontend |
| Schema, migration, query | @dev-database |
| Teste unitário, integração | @dev-test |
| CI/CD, Docker, deploy | @dev-infra |
| JSDoc, README, OpenAPI | @dev-docs |

### Exemplo no PLAN.md

```markdown
### Fase 2: Backend
- [ ] 2.1 Criar modelo Product @dev-database
- [ ] 2.2 Implementar ProductService @dev-backend
- [ ] 2.3 Criar endpoints CRUD @dev-backend
- [ ] 2.4 Testes unitários @dev-test
- [ ] 2.5 Documentar API @dev-docs
```

---

## Colaboração entre Sub-agentes

Os sub-agentes frequentemente colaboram:

```
@dev-database ──► @dev-backend ──► @dev-frontend
      │                │                │
      └───────► @dev-test ◄─────────────┘
                    │
                    ▼
               @dev-docs
```

- **@dev-database** cria schema
- **@dev-backend** implementa lógica usando schema
- **@dev-frontend** consome API do backend
- **@dev-test** testa todos os componentes
- **@dev-docs** documenta tudo
