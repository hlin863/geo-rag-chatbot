import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.index(process.env.PINECONE_INDEX!);

/**
 * Converts a user query to an embedding and searches Pinecone for similar chunks.
 */
export async function queryRelevantChunks(query: string, topK: number = 5): Promise<string[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query,
  });

  const queryEmbedding = response.data[0].embedding;

  const queryResponse = await index.namespace(process.env.PINECONE_NAMESPACE || 'default').query({
    topK,
    vector: queryEmbedding,
    includeMetadata: true,
  });

  return queryResponse.matches?.map(match => String(match.metadata?.text ?? '')) ?? [];
}