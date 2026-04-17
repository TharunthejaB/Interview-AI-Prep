const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are a backend API that MUST Return strictly valid JSON. Do not include any text before or after the JSON.

Task:
Generate ${numberOfQuestions} technical interview questions and answers.

Input:
- Role: ${role}
- Experience: ${experience} years
- Topics: ${topicsToFocus}

Requirements:
- Each question must be clear and relevant
- Answers must be beginner-friendly and concise
- If including code, write it as plain text (NO markdown or triple backticks)
- Use \\n for line breaks inside strings

CRITICAL JSON RULES:
- Output MUST be a valid JSON array
- Do NOT include any text before or after JSON
- Do NOT include markdown (no \`\`\`)
- Escape all quotes properly

Return EXACTLY:
[
  {
    "question": "string",
    "answer": "string"
  }
]


`;
const moreQuestionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
  questions
) => `
You are a backend API that MUST return strictly valid JSON.

Task:
Generate ${numberOfQuestions} NEW technical interview questions and answers.

Input:
Role: ${role}
Experience: ${experience} years
Topics: ${topicsToFocus}

Existing Questions (DO NOT repeat or rephrase):
${questions.map((q, i) => `- ${q}`).join("\\n") || "None"}

Rules:
- Do NOT repeat or rephrase any existing question
- All questions must be unique
- Keep answers clear and beginner-friendly
- If including code, represent it as plain text (NO triple backticks)

CRITICAL JSON RULES:
- Output MUST be a valid JSON array
- Do NOT include any text before or after JSON
- Do NOT include markdown (no \`\`\`)
- Escape all line breaks using \\n
- Escape all quotes properly

Return EXACTLY in this format:
[
  {
    "question": "string",
    "answer": "string"
  }
]
`;


const conceptExplainPrompt = (question) => `
You are a backend API that MUST return strictly valid JSON.

Task:
Explain the following interview question in a beginner-friendly way.

Question: ${question}

Requirements:
- Explanation MUST be in Markdown format
- You CAN use headings, lists, and code blocks
- Keep it clean and readable

CRITICAL RULES:
- Output MUST be valid JSON
- Do NOT include text outside JSON
- Escape all newlines using \\n
- Escape quotes properly

Return EXACTLY:
{
  "title": ${question},
  "explanation": "Markdown explanation"
}
`;

module.exports = {questionAnswerPrompt, conceptExplainPrompt, moreQuestionAnswerPrompt}