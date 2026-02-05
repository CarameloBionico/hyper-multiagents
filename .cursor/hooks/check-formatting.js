#!/usr/bin/env node

/**
 * Hook: check-formatting
 * 
 * Checks code formatting against Google Style Guide standards.
 * Runs after each file edit to ensure consistent formatting.
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
    const result = checkFormatting(data);
    console.log(JSON.stringify(result));
    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    process.exit(0); // Don't block on hook errors
  }
});

/**
 * Check formatting in edited file.
 * 
 * @param {Object} data - Hook input data
 * @param {string} data.file_path - Path to the edited file
 * @param {Array} data.edits - List of edits made
 * @returns {Object} Hook response
 */
function checkFormatting(data) {
  const { file_path, edits } = data;
  
  // Skip non-code files
  const codeExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.css', '.scss'];
  const ext = path.extname(file_path);
  
  if (!codeExtensions.includes(ext)) {
    return { continue: true };
  }
  
  // Read the edited file
  let content = '';
  try {
    content = fs.readFileSync(file_path, 'utf-8');
  } catch (error) {
    return { continue: true }; // File might not exist yet
  }
  
  const issues = [];
  
  // Google Style Guide checks
  issues.push(...checkIndentation(content, ext));
  issues.push(...checkLineLength(content, ext));
  issues.push(...checkTrailingWhitespace(content));
  issues.push(...checkNewlineAtEnd(content));
  
  if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
    issues.push(...checkTypeScriptFormatting(content));
  }
  
  // If issues found, log them
  if (issues.length > 0) {
    const logPath = path.join(process.cwd(), '.cursor', 'hooks', 'logs', 'formatting.log');
    const logDir = path.dirname(logPath);
    
    // Ensure log directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${file_path}\n${issues.map(i => `  - ${i}`).join('\n')}\n\n`;
    
    fs.appendFileSync(logPath, logEntry);
    
    return {
      continue: true,
      agent_message: `Formatting check: Found ${issues.length} formatting issues in ${path.basename(file_path)}. Consider running a formatter (prettier, black, gofmt). See .cursor/hooks/logs/formatting.log for details.`
    };
  }
  
  return { continue: true };
}

/**
 * Check indentation (Google Style: 2 spaces for JS/TS, 4 spaces for Python).
 * 
 * @param {string} content - File content
 * @param {string} ext - File extension
 * @returns {string[]} List of issues
 */
function checkIndentation(content, ext) {
  const issues = [];
  const lines = content.split('\n');
  
  // Expected indentation size
  const expectedIndent = ['.py'].includes(ext) ? 4 : 2;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines
    if (line.trim() === '') continue;
    
    // Check for tabs (Google Style prefers spaces)
    if (line.startsWith('\t')) {
      issues.push(`Line ${i + 1}: Uses tabs instead of spaces`);
      continue;
    }
    
    // Check indentation is multiple of expected
    const leadingSpaces = line.match(/^( *)/)[1].length;
    if (leadingSpaces > 0 && leadingSpaces % expectedIndent !== 0) {
      // This can have false positives with aligned parameters, so just warn
      // issues.push(`Line ${i + 1}: Indentation not multiple of ${expectedIndent}`);
    }
  }
  
  // Limit issues reported
  return issues.slice(0, 5);
}

/**
 * Check line length (Google Style: 80-100 characters).
 * 
 * @param {string} content - File content
 * @param {string} ext - File extension
 * @returns {string[]} List of issues
 */
function checkLineLength(content, ext) {
  const issues = [];
  const lines = content.split('\n');
  
  // Max line length (Google suggests 80, but 100 is common)
  const maxLength = 100;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip URLs and import statements
    if (line.includes('http://') || line.includes('https://')) continue;
    if (line.trim().startsWith('import ') || line.trim().startsWith('from ')) continue;
    
    if (line.length > maxLength) {
      issues.push(`Line ${i + 1}: Line too long (${line.length} > ${maxLength})`);
    }
  }
  
  // Limit issues reported
  return issues.slice(0, 5);
}

/**
 * Check for trailing whitespace.
 * 
 * @param {string} content - File content
 * @returns {string[]} List of issues
 */
function checkTrailingWhitespace(content) {
  const issues = [];
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line !== line.trimEnd()) {
      issues.push(`Line ${i + 1}: Trailing whitespace`);
    }
  }
  
  // Limit issues reported
  return issues.slice(0, 5);
}

/**
 * Check for newline at end of file.
 * 
 * @param {string} content - File content
 * @returns {string[]} List of issues
 */
function checkNewlineAtEnd(content) {
  if (!content.endsWith('\n')) {
    return ['File does not end with newline'];
  }
  return [];
}

/**
 * TypeScript/JavaScript specific formatting checks.
 * 
 * @param {string} content - File content
 * @returns {string[]} List of issues
 */
function checkTypeScriptFormatting(content) {
  const issues = [];
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for semicolon consistency (Google Style uses semicolons)
    // This is a simple check - a proper linter would be better
    const trimmed = line.trim();
    
    // Check for var usage (prefer const/let)
    if (/\bvar\s+\w+/.test(trimmed)) {
      issues.push(`Line ${i + 1}: Use 'const' or 'let' instead of 'var'`);
    }
    
    // Check for == instead of === (except for null checks)
    if (/[^=!]==[^=]/.test(trimmed) && !trimmed.includes('== null')) {
      issues.push(`Line ${i + 1}: Use '===' instead of '=='`);
    }
  }
  
  // Limit issues reported
  return issues.slice(0, 5);
}
