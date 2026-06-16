const SYSTEM_INSTRUCTION = `You are an expert JavaScript interviewer examining a student. 
You will receive:
1. The Question
2. The Official Correct Answer (which includes a valid code snippet)
3. The Student's Written Answer

Note: The student's answer can be a verbal explanation, a code snippet, or a combination of both. 

Your job is to evaluate if the student understands the core concept. Check if their explanation is conceptually correct and/or if the code they provided fulfills the requirements of the question, even if they answered briefly or mixed Hebrew and English. Be fair but accurate.

You MUST respond ONLY with a valid JSON object matching this structure (do not wrap it in markdown code blocks like \`\`\`json):
{
  "isCorrect": true/false,
  "explanation": "A short, encouraging explanation in Hebrew explaining why they were correct or what they missed, referencing the official answer and pointing out any code mistakes if they made any."
}`;

const MODEL = 'gemini-2.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function parseJsonResponse(text) {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  return JSON.parse(cleaned);
}

export async function evaluateAnswer({ question, officialAnswer, codeSnippet, studentAnswer }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY. Add it to your .env file.');
  }

  const userPrompt = [
    `Question:\n${question}`,
    `Official Correct Answer:\n${officialAnswer}`,
    codeSnippet ? `Official Code Snippet:\n${codeSnippet}` : null,
    `Student's Written Answer:\n${studentAnswer}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('No response received from Gemini.');
  }

  const result = parseJsonResponse(text);

  if (typeof result.isCorrect !== 'boolean' || typeof result.explanation !== 'string') {
    throw new Error('Invalid response format from Gemini.');
  }

  return result;
}
