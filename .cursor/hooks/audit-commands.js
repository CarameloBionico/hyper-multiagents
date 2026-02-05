#!/usr/bin/env node

/**
 * Hook: audit-commands
 * 
 * Audits shell commands before execution for security and logging purposes.
 * Runs before any shell command to track what the agent is doing.
 */

const fs = require('fs');
const path = require('path');

// Read input from stdin
let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const result = auditCommand(data);
    console.log(JSON.stringify(result));
    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    console.log(JSON.stringify({ continue: true, permission: 'allow' }));
    process.exit(0);
  }
});

/**
 * Audit shell command.
 * 
 * @param {Object} data - Hook input data
 * @param {string} data.command - Command to be executed
 * @param {string} data.cwd - Current working directory
 * @returns {Object} Hook response
 */
function auditCommand(data) {
  const { command, cwd } = data;
  
  const logPath = path.join(process.cwd(), '.cursor', 'hooks', 'logs', 'commands.log');
  const logDir = path.dirname(logPath);
  
  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${cwd || '.'}\n  $ ${command}\n\n`;
  
  fs.appendFileSync(logPath, logEntry);
  
  // Check for potentially dangerous commands
  const dangerousPatterns = [
    /rm\s+-rf\s+\//, // rm -rf /
    /rm\s+-rf\s+~/, // rm -rf ~
    /:(){ :|:& };:/, // Fork bomb
    />\s*\/dev\/sd/, // Write to disk devices
    /mkfs/, // Format filesystem
    /dd\s+if=.*of=\/dev/, // dd to devices
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(command)) {
      return {
        continue: true,
        permission: 'deny',
        user_message: 'Dangerous command blocked for safety.',
        agent_message: `The command "${command}" was blocked because it matches a dangerous pattern. Please use a safer alternative.`
      };
    }
  }
  
  // Commands that should ask for permission
  const askPatterns = [
    /git\s+push/, // git push
    /git\s+push\s+.*--force/, // git push --force
    /npm\s+publish/, // npm publish
    /docker\s+push/, // docker push
    /kubectl\s+(delete|apply)/, // kubectl operations
  ];
  
  for (const pattern of askPatterns) {
    if (pattern.test(command)) {
      return {
        continue: true,
        permission: 'ask',
        user_message: `Command requires confirmation: ${command}`,
        agent_message: `This command (${command}) can have significant effects. Please confirm before proceeding.`
      };
    }
  }
  
  return {
    continue: true,
    permission: 'allow'
  };
}
