# Referência de Hooks

## Visão Geral

Hooks são scripts que rodam automaticamente em pontos específicos do ciclo de vida do agente. Eles permitem observar, modificar ou bloquear ações.

## Hooks Disponíveis

### verify-documentation

**Trigger**: `afterFileEdit`

**Função**: Verifica se o código editado tem documentação adequada seguindo Google Style Guide.

**Verificações**:
- Exports sem JSDoc
- Funções públicas sem documentação
- Classes sem documentação

**Saída**: Log em `.cursor/hooks/logs/documentation.log`

---

### check-formatting

**Trigger**: `afterFileEdit`

**Função**: Verifica formatação do código contra padrões do Google Style Guide.

**Verificações**:
- Indentação (2 espaços JS/TS, 4 espaços Python)
- Comprimento de linha (máx 100)
- Trailing whitespace
- Newline no final do arquivo
- Uso de `var` vs `const/let`
- `==` vs `===`

**Saída**: Log em `.cursor/hooks/logs/formatting.log`

---

### execution-summary

**Trigger**: `stop`

**Função**: Gera resumo quando a execução do agente termina.

**Informações**:
- Status da sessão
- Número de loops
- Issues de documentação encontradas
- Issues de formatação encontradas

**Saída**: Log em `.cursor/hooks/logs/sessions.log`

---

### audit-commands

**Trigger**: `beforeShellExecution`

**Função**: Audita comandos shell antes da execução.

**Ações**:
- **Bloqueia**: Comandos destrutivos (`rm -rf /`, fork bombs, etc.)
- **Pede confirmação**: Comandos sensíveis (`git push`, `npm publish`, etc.)
- **Permite**: Comandos seguros

**Saída**: Log em `.cursor/hooks/logs/commands.log`

---

## Configuração

Os hooks são configurados em `.cursor/hooks.json`:

```json
{
  "version": 1,
  "hooks": {
    "afterFileEdit": [
      { "command": "node .cursor/hooks/verify-documentation.js" },
      { "command": "node .cursor/hooks/check-formatting.js" }
    ],
    "stop": [
      { "command": "node .cursor/hooks/execution-summary.js" }
    ],
    "beforeShellExecution": [
      { "command": "node .cursor/hooks/audit-commands.js" }
    ]
  }
}
```

## Criando Novos Hooks

### Estrutura Básica

```javascript
#!/usr/bin/env node

// Read input from stdin
let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const result = processHook(data);
    console.log(JSON.stringify(result));
    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    process.exit(0); // Don't block on errors
  }
});

function processHook(data) {
  // Your logic here
  return { continue: true };
}
```

### Input por Tipo de Hook

**afterFileEdit**:
```json
{
  "file_path": "/path/to/file.ts",
  "edits": [{ "old_string": "...", "new_string": "..." }]
}
```

**beforeShellExecution**:
```json
{
  "command": "npm install",
  "cwd": "/path/to/project"
}
```

**stop**:
```json
{
  "status": "completed",
  "loop_count": 5,
  "conversation_id": "abc123"
}
```

### Output

**Permitir ação**:
```json
{ "continue": true }
```

**Bloquear ação**:
```json
{
  "continue": true,
  "permission": "deny",
  "user_message": "Mensagem para o usuário",
  "agent_message": "Mensagem para o agente"
}
```

**Pedir confirmação**:
```json
{
  "continue": true,
  "permission": "ask",
  "user_message": "Deseja continuar?"
}
```

## Logs

Todos os hooks escrevem logs em `.cursor/hooks/logs/`:

| Arquivo | Conteúdo |
|---------|----------|
| `documentation.log` | Issues de documentação por arquivo |
| `formatting.log` | Issues de formatação por arquivo |
| `commands.log` | Histórico de comandos executados |
| `sessions.log` | Resumo de cada sessão |

### Formato do Log

```
[2024-01-15T10:30:00.000Z] /path/to/file.ts
  - Line 15: Export 'functionName' missing JSDoc documentation
  - Line 42: Function 'helper' missing JSDoc documentation
```
