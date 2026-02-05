#!/usr/bin/env node

/**
 * Hook: verify-documentation
 * 
 * Verifies that code changes have proper documentation following Google Style Guide.
 * Runs after each file edit to ensure documentation standards are maintained.
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
    const result = verifyDocumentation(data);
    console.log(JSON.stringify(result));
    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    process.exit(0); // Don't block on hook errors
  }
});

/**
 * Verify documentation in edited file.
 * 
 * @param {Object} data - Hook input data
 * @param {string} data.file_path - Path to the edited file
 * @param {Array} data.edits - List of edits made
 * @returns {Object} Hook response
 */
function verifyDocumentation(data) {
  const { file_path, edits } = data;
  
  // Skip non-code files
  const codeExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java'];
  const ext = path.extname(file_path);
  
  if (!codeExtensions.includes(ext)) {
    return { continue: true };
  }
  
  // Skip test files (they don't need the same level of documentation)
  if (file_path.includes('.test.') || file_path.includes('.spec.') || file_path.includes('__tests__')) {
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
  
  // Check for documentation issues based on file type
  if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
    issues.push(...checkTypeScriptJavaScriptDocs(content, file_path));
  } else if (ext === '.py') {
    issues.push(...checkPythonDocs(content, file_path));
  }
  
  // If issues found, add a note for the agent
  if (issues.length > 0) {
    const logPath = path.join(process.cwd(), '.cursor', 'hooks', 'logs', 'documentation.log');
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
      agent_message: `Documentation check: Found ${issues.length} potential documentation issues in ${path.basename(file_path)}. Consider adding JSDoc comments to public functions and classes. See .cursor/hooks/logs/documentation.log for details.`
    };
  }
  
  return { continue: true };
}

/**
 * Check TypeScript/JavaScript documentation.
 * 
 * @param {string} content - File content
 * @param {string} filePath - File path
 * @returns {string[]} List of documentation issues
 */
function checkTypeScriptJavaScriptDocs(content, filePath) {
  const issues = [];
  const lines = content.split('\n');
  
  // Patterns for exported items that should have JSDoc
  const exportPatterns = [
    /^export\s+(async\s+)?function\s+(\w+)/,
    /^export\s+(const|let)\s+(\w+)\s*=\s*(async\s+)?\(/,
    /^export\s+(class|interface|type|enum)\s+(\w+)/,
    /^export\s+default\s+(async\s+)?function\s+(\w+)?/
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    for (const pattern of exportPatterns) {
      const match = line.match(pattern);
      if (match) {
        // Check if previous non-empty line is a JSDoc comment
        let hasJSDoc = false;
        for (let j = i - 1; j >= 0; j--) {
          const prevLine = lines[j].trim();
          if (prevLine === '') continue;
          if (prevLine.endsWith('*/')) {
            hasJSDoc = true;
          }
          break;
        }
        
        if (!hasJSDoc) {
          const name = match[2] || match[3] || 'anonymous';
          issues.push(`Line ${i + 1}: Export '${name}' missing JSDoc documentation`);
        }
        break;
      }
    }
  }
  
  return issues;
}

/**
 * Check Python documentation.
 * 
 * @param {string} content - File content
 * @param {string} filePath - File path
 * @returns {string[]} List of documentation issues
 */
function checkPythonDocs(content, filePath) {
  const issues = [];
  const lines = content.split('\n');
  
  // Pattern for function/class definitions
  const defPattern = /^(async\s+)?def\s+(\w+)\s*\(/;
  const classPattern = /^class\s+(\w+)/;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip private methods (starting with _)
    const defMatch = trimmedLine.match(defPattern);
    const classMatch = trimmedLine.match(classPattern);
    
    if (defMatch && !defMatch[2].startsWith('_')) {
      // Check for docstring on next line
      const nextLine = lines[i + 1]?.trim() || '';
      if (!nextLine.startsWith('"""') && !nextLine.startsWith("'''")) {
        issues.push(`Line ${i + 1}: Function '${defMatch[2]}' missing docstring`);
      }
    }
    
    if (classMatch) {
      // Check for docstring on next line
      const nextLine = lines[i + 1]?.trim() || '';
      if (!nextLine.startsWith('"""') && !nextLine.startsWith("'''")) {
        issues.push(`Line ${i + 1}: Class '${classMatch[1]}' missing docstring`);
      }
    }
  }
  
  return issues;
}
