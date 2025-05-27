import OpenAI from 'openai';
import 'dotenv/config'; // Ensure your .env is loaded

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Converts each chunk of text into an embedding vector using OpenAI's API.
 */
export async function getEmbeddings(chunks: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (const chunk of chunks) {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: chunk,
    });

    embeddings.push(response.data[0].embedding);
  }

  return embeddings;
}
