import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * Generates a natural language answer based on retrieved chunks and the question.
 */
export async function generateAnswer(question: string, contextChunks: string[]): Promise<string> {
  const prompt = `
Answer the question based on the context below.

Context:
${contextChunks.join('\n\n')}

Question: ${question}
Answer:
`;

  const completion = await openai.completions.create({
    model: 'gpt-4o-mini',
    prompt,
    max_tokens: 300,
    temperature: 0.7,
  });

  return completion.choices[0]?.text?.trim() || '[No answer generated]';
}