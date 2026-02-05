#!/usr/bin/env node

/**
 * Hook: execution-summary
 * 
 * Generates a summary when the agent stops execution.
 * Useful for tracking what was accomplished in each session.
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
    const result = generateSummary(data);
    console.log(JSON.stringify(result));
    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    console.log(JSON.stringify({}));
    process.exit(0);
  }
});

/**
 * Generate execution summary.
 * 
 * @param {Object} data - Hook input data
 * @param {string} data.status - Execution status (completed, aborted, error)
 * @param {number} data.loop_count - Number of agent loops
 * @param {string} data.conversation_id - Conversation ID
 * @returns {Object} Hook response
 */
function generateSummary(data) {
  const { status, loop_count, conversation_id } = data;
  
  const logPath = path.join(process.cwd(), '.cursor', 'hooks', 'logs', 'sessions.log');
  const logDir = path.dirname(logPath);
  
  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Session: ${conversation_id || 'unknown'}\n  Status: ${status}\n  Loops: ${loop_count}\n\n`;
  
  fs.appendFileSync(logPath, logEntry);
  
  // Read documentation and formatting logs to provide summary
  const docLogPath = path.join(logDir, 'documentation.log');
  const formatLogPath = path.join(logDir, 'formatting.log');
  
  let docIssues = 0;
  let formatIssues = 0;
  
  try {
    if (fs.existsSync(docLogPath)) {
      const docLog = fs.readFileSync(docLogPath, 'utf-8');
      docIssues = (docLog.match(/\n  - /g) || []).length;
    }
  } catch (e) { /* ignore */ }
  
  try {
    if (fs.existsSync(formatLogPath)) {
      const formatLog = fs.readFileSync(formatLogPath, 'utf-8');
      formatIssues = (formatLog.match(/\n  - /g) || []).length;
    }
  } catch (e) { /* ignore */ }
  
  // Provide summary if there were issues
  if (docIssues > 0 || formatIssues > 0) {
    return {
      followup_message: null, // Don't auto-continue
      user_message: `Session completed. Found ${docIssues} documentation issues and ${formatIssues} formatting issues. Check .cursor/hooks/logs/ for details.`
    };
  }
  
  return {};
}
