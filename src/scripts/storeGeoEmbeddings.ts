import path from 'path';
import { extractGeoLimitsFromTable, chunkTextRows } from '../ingestion/htmlLoader';
import { getEmbeddings } from '../embedding/generateEmbeddings';
import { upsertEmbeddings } from '../embedding/vectorStore';

const filePath = path.join(__dirname, '../../tests/test-pages/limits/GEO_Limits.htm');

const rows = extractGeoLimitsFromTable(filePath);
const chunks = chunkTextRows(rows, 500);

console.log(`⏳ Generating embeddings for ${chunks.length} chunks...`);
console.time('🧠 Embedding + Pinecone Upsert Time');

getEmbeddings(chunks)
  .then(embeddings => upsertEmbeddings(embeddings, chunks))
  .then(() => {
    console.timeEnd('🧠 Embedding + Pinecone Upsert Time');
    console.log('✅ All embeddings uploaded to Pinecone.');
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });
