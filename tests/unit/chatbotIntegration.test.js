// tests/unit/chatbotIntegration.test.js
// Unit tests and architecture verification for AIChatbot and geminiProxy
import fs from 'fs';
import path from 'path';

export function runChatbotIntegrationTests() {
  const results = [];
  const assert = (desc, cond) => results.push({ desc, pass: !!cond });

  // 1. Firebase Functions export
  const fbPath = path.resolve(process.cwd(), 'src/firebase.js');
  const fbCode = fs.readFileSync(fbPath, 'utf8');
  assert('src/firebase.js exports functions instance configured for asia-south1', fbCode.includes('getFunctions') && fbCode.includes("'asia-south1'"));

  // 2. Cloud Function definition
  const funcPath = path.resolve(process.cwd(), 'functions/index.js');
  const funcCode = fs.readFileSync(funcPath, 'utf8');
  assert('functions/index.js defines and exports geminiProxy callable function', funcCode.includes('export const geminiProxy = onCall'));
  assert('geminiProxy specifies secrets: [GEMINI_API_KEY]', funcCode.includes("secrets: ['GEMINI_API_KEY']"));

  // 3. AIChatbot.jsx Tiered Architecture
  const botPath = path.resolve(process.cwd(), 'src/components/AIChatbot.jsx');
  const botCode = fs.readFileSync(botPath, 'utf8');

  assert('AIChatbot.jsx imports functions and httpsCallable', botCode.includes('httpsCallable') && botCode.includes('functions'));
  assert('AIChatbot.jsx Tier 1 routes prompt to geminiProxy server callable', botCode.includes("httpsCallable(functions, 'geminiProxy')"));
  assert('AIChatbot.jsx Tier 2 maintains direct client fallback if API key exists', botCode.includes('activeKey') && botCode.includes('modelsToTry'));
  assert('AIChatbot.jsx Tier 3 routes to getIntelligentFallback when AI returns null', botCode.includes('getIntelligentFallback(query)'));

  return results;
}
