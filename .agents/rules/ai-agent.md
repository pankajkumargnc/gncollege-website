---
name: ai-agent
description: "🤖 AI Systems & RAG Architect — Voice, Chatbot, and RAG rules."
---

# 🤖 AI_Agent Rules

1. **Voice Capabilities**: Support Web Speech API Speech-to-Text and Text-to-Speech in both Hindi (`hi-IN`) and English (`en-IN`).
2. **Action Pills**: Render interactive, accessible action pills for primary college actions (Admissions, Fee Payment, Exam Results, 360 Virtual Tour, Certificate Requests).
3. **Secret Isolation**: Never store API keys in client-accessible Firestore documents; source from environment variables or Cloud Functions.
4. **Offline Fallback Engine**: Always provide deterministic keyword-based responses for college operations if the LLM API is unavailable.
