---
name: mermaid-diagrams
description: Boas práticas para criar diagramas e fluxogramas com Mermaid. Use quando precisar criar flowcharts, diagramas de sequência, ERD, diagramas de estado, Gantt, mindmaps ou qualquer visualização em Mermaid.
---

# Mermaid Diagrams - Boas Práticas

Esta skill fornece diretrizes e boas práticas para criar diagramas profissionais e legíveis usando Mermaid.

## Quando Usar

- Criar fluxogramas de processos
- Documentar arquitetura de sistemas
- Visualizar fluxos de dados
- Criar diagramas de sequência para APIs
- Modelar entidades e relacionamentos (ERD)
- Criar diagramas de estado
- Visualizar cronogramas (Gantt)
- Criar mindmaps e diagramas de classe

## Tipos de Diagramas Disponíveis

### 1. Flowchart (Fluxograma)

**Quando usar:** Processos, decisões, fluxos de trabalho

```mermaid
flowchart TD
    A[Início] --> B{Decisão?}
    B -->|Sim| C[Ação 1]
    B -->|Não| D[Ação 2]
    C --> E[Fim]
    D --> E
```

**Direções:**
- `TD` ou `TB`: Top to Down (cima para baixo)
- `BT`: Bottom to Top (baixo para cima)
- `LR`: Left to Right (esquerda para direita)
- `RL`: Right to Left (direita para esquerda)

**Formas de nós:**
- `[texto]` - Retângulo
- `(texto)` - Retângulo arredondado
- `{texto}` - Losango (decisão)
- `([texto])` - Estádio/Pill
- `[[texto]]` - Subrotina
- `[(texto)]` - Cilindro (database)
- `((texto))` - Círculo
- `>texto]` - Flag
- `{{texto}}` - Hexágono

### 2. Sequence Diagram (Diagrama de Sequência)

**Quando usar:** Interações entre sistemas, APIs, comunicação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant A as API
    participant D as Database

    U->>F: Clica em Login
    F->>A: POST /auth/login
    A->>D: SELECT user
    D-->>A: User data
    A-->>F: JWT Token
    F-->>U: Redireciona para Home
```

**Tipos de setas:**
- `->` : Linha sólida sem seta
- `-->` : Linha pontilhada sem seta
- `->>` : Linha sólida com seta
- `-->>` : Linha pontilhada com seta
- `-x` : Linha sólida com X (erro/falha)
- `--x` : Linha pontilhada com X

### 3. Entity Relationship Diagram (ERD)

**Quando usar:** Modelagem de banco de dados, relacionamentos

```mermaid
erDiagram
    USUARIO ||--o{ PEDIDO : "faz"
    PEDIDO ||--|{ ITEM_PEDIDO : "contém"
    PRODUTO ||--o{ ITEM_PEDIDO : "está em"
    
    USUARIO {
        int id PK
        string nome
        string email UK
        datetime created_at
    }
    
    PEDIDO {
        int id PK
        int usuario_id FK
        decimal total
        string status
    }
```

**Cardinalidades:**
- `||--||` : Um para um
- `||--o{` : Um para muitos (opcional)
- `||--|{` : Um para muitos (obrigatório)
- `o{--o{` : Muitos para muitos

### 4. State Diagram (Diagrama de Estado)

**Quando usar:** Máquinas de estado, ciclo de vida de objetos

```mermaid
stateDiagram-v2
    [*] --> Rascunho
    Rascunho --> EmRevisao: Enviar
    EmRevisao --> Aprovado: Aprovar
    EmRevisao --> Rascunho: Rejeitar
    Aprovado --> Publicado: Publicar
    Publicado --> Arquivado: Arquivar
    Arquivado --> [*]
```

### 5. Class Diagram (Diagrama de Classe)

**Quando usar:** Estrutura de classes, OOP, arquitetura

```mermaid
classDiagram
    class Usuario {
        +int id
        +string nome
        +string email
        +login()
        +logout()
    }
    
    class Pedido {
        +int id
        +decimal total
        +calcularTotal()
    }
    
    Usuario "1" --> "*" Pedido : faz
```

**Visibilidade:**
- `+` : Público
- `-` : Privado
- `#` : Protegido
- `~` : Package

### 6. Gantt Chart

**Quando usar:** Cronogramas, planejamento de projeto

```mermaid
gantt
    title Cronograma do Projeto
    dateFormat YYYY-MM-DD
    
    section Fase 1
    Análise        :a1, 2024-01-01, 7d
    Design         :a2, after a1, 5d
    
    section Fase 2
    Desenvolvimento :b1, after a2, 14d
    Testes         :b2, after b1, 7d
    
    section Fase 3
    Deploy         :c1, after b2, 3d
```

### 7. Mindmap

**Quando usar:** Brainstorming, organização de ideias

```mermaid
mindmap
    root((Projeto))
        Frontend
            React
            TypeScript
            Tailwind
        Backend
            Node.js
            Express
            PostgreSQL
        DevOps
            Docker
            CI/CD
            AWS
```

### 8. Pie Chart

**Quando usar:** Distribuição, proporções

```mermaid
pie title Distribuição de Tarefas
    "Desenvolvimento" : 45
    "Testes" : 25
    "Documentação" : 15
    "Reuniões" : 15
```

## Boas Práticas Gerais

### 1. Clareza e Simplicidade
- **Limite nós por diagrama:** Máximo 15-20 nós para manter legibilidade
- **Use labels descritivos:** Nomes claros e concisos
- **Evite cruzamento de linhas:** Reorganize para minimizar cruzamentos

### 2. Hierarquia Visual
- **Fluxo consistente:** Mantenha direção consistente (geralmente TD ou LR)
- **Agrupe elementos relacionados:** Use subgraphs para organizar
- **Destaque caminhos principais:** Use estilos diferentes para fluxos críticos

### 3. Nomenclatura
- **IDs curtos:** Use IDs de 1-3 caracteres (A, B, C ou A1, A2)
- **Labels descritivos:** O texto visível deve ser autoexplicativo
- **Consistência:** Mantenha padrão de nomenclatura

### 4. Uso de Subgraphs (Agrupamento)

```mermaid
flowchart LR
    subgraph Frontend
        A[React App]
        B[Components]
    end
    
    subgraph Backend
        C[API]
        D[Services]
    end
    
    subgraph Database
        E[(PostgreSQL)]
    end
    
    A --> C
    C --> D
    D --> E
```

### 5. Estilização

```mermaid
flowchart TD
    A[Normal]:::default
    B[Sucesso]:::success
    C[Erro]:::error
    D[Aviso]:::warning
    
    A --> B
    A --> C
    A --> D
    
    classDef default fill:#f9f9f9,stroke:#333
    classDef success fill:#d4edda,stroke:#28a745
    classDef error fill:#f8d7da,stroke:#dc3545
    classDef warning fill:#fff3cd,stroke:#ffc107
```

### 6. Notas e Comentários

```mermaid
sequenceDiagram
    participant A as Sistema A
    participant B as Sistema B
    
    A->>B: Request
    Note over A,B: Comunicação assíncrona
    B-->>A: Response
    Note right of B: Pode levar até 30s
```

## Anti-Patterns (O que Evitar)

1. **Diagramas muito grandes:** Divida em múltiplos diagramas menores
2. **Labels genéricos:** Evite "Processo 1", "Etapa A" - seja específico
3. **Muitas cores:** Use cores com propósito, não decoração
4. **Setas em todas direções:** Mantenha fluxo previsível
5. **Texto longo em nós:** Use notas ou legendas para detalhes

## Checklist de Qualidade

Antes de finalizar um diagrama, verifique:

- [ ] O propósito do diagrama está claro?
- [ ] Todos os nós têm labels descritivos?
- [ ] O fluxo é fácil de seguir?
- [ ] Não há mais de 15-20 elementos?
- [ ] As cores têm significado consistente?
- [ ] Elementos relacionados estão agrupados?
- [ ] O diagrama funciona em preto e branco?

## Templates Prontos

### Template: API Flow

```mermaid
flowchart LR
    subgraph Client
        A[App/Browser]
    end
    
    subgraph Gateway
        B[API Gateway]
        C[Auth]
    end
    
    subgraph Services
        D[Service A]
        E[Service B]
    end
    
    subgraph Data
        F[(Database)]
        G[(Cache)]
    end
    
    A -->|Request| B
    B --> C
    C -->|Valid| D
    C -->|Valid| E
    D --> F
    E --> G
```

### Template: Error Handling Flow

```mermaid
flowchart TD
    A[Operação] --> B{Sucesso?}
    B -->|Sim| C[Continuar]
    B -->|Não| D{Retry?}
    D -->|Sim| E[Aguardar]
    E --> A
    D -->|Não| F[Log Error]
    F --> G[Notificar]
    G --> H[Fallback]
```

### Template: Authentication Flow

```mermaid
sequenceDiagram
    actor U as Usuário
    participant C as Cliente
    participant A as Auth Server
    participant R as Resource Server

    U->>C: Login Request
    C->>A: Authenticate
    A-->>C: Access Token + Refresh Token
    C->>R: Request + Access Token
    R-->>C: Protected Resource
    C-->>U: Display Data
```

## Dicas Finais

1. **Comece simples:** Adicione complexidade gradualmente
2. **Teste renderização:** Verifique se o diagrama renderiza corretamente
3. **Peça feedback:** Diagramas devem ser compreensíveis por outros
4. **Versione:** Mantenha diagramas junto ao código relacionado
5. **Atualize:** Diagramas desatualizados são piores que nenhum diagrama
