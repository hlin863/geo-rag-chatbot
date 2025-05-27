import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.index(process.env.PINECONE_INDEX!); // ✅ lowercase `.index(...)`

/**
 * Uploads embeddings to Pinecone with metadata.
 */
export async function upsertEmbeddings(embeddings: number[][], chunks: string[]) {
  if (embeddings.length !== chunks.length) {
    throw new Error('Embeddings and chunks must be the same length.');
  }

  const vectors = embeddings.map((embedding, i) => ({
    id: `chunk-${i}`,
    values: embedding,
    metadata: { text: chunks[i] },
  }));

  console.log(`📤 Upserting ${vectors.length} vectors to Pinecone...`);

  await index.namespace(process.env.PINECONE_NAMESPACE || 'default').upsert(vectors); // ✅ namespace call required now

  console.log('✅ Upsert complete.');
}