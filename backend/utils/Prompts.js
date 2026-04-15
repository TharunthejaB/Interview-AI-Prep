const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => 
    `You are an AI trained to generate technical interview questions and answers.
Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:
    [
        {
            "question": "Question here?",
            "answer": "Anster here."
        },
        ...
    ],
Important: Do NOT add any extra text. Only return valid JSON.`

const moreQuestionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
  questions
) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} NEW interview questions.

Constraints:
- Do NOT repeat or rephrase any of the following existing questions:
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n") || "None"}

- Ensure all questions are unique, fresh, and different from the above list.
- Cover a diverse range of subtopics within the given focus areas.
- Avoid duplicates, even if phrased differently.

Output Requirements:
- For each question, generate a detailed but beginner-friendly answer.
- If needed, include a small code block inside the answer.
- Keep formatting very clean.

Return format:
[
  {
    "question": "Question here?",
    "answer": "Answer here."
  }
]

Important:
- Return ONLY valid JSON.
- Do NOT include any extra text, explanation, or markdown.
`;


const conceptExplainPrompt = (question) =>
`You are an AI trained to generate explanations for a given interview question.
Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: ${question}
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean and clear.
- Return the result as a valid JSON object in the following format:
{
"title": "Short title here?",
"explanation": "Explanation here."
}
Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.`

module.exports = {questionAnswerPrompt, conceptExplainPrompt, moreQuestionAnswerPrompt}