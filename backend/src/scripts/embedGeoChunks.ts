import path from 'path';
import { extractGeoLimitsFromTable, chunkTextRows } from '../ingestion/htmlLoader';
import { getEmbeddings } from '../embedding/generateEmbeddings';

const filePath = path.join(__dirname, '../../tests/test-pages/limits/GEO_Limits.htm');
const rows = extractGeoLimitsFromTable(filePath);
const chunks = chunkTextRows(rows, 500);

console.log(`⏳ Generating embeddings for ${chunks.length} chunks...`);

console.time('🧠 Embedding time');

getEmbeddings(chunks).then(vectors => {
  console.timeEnd('🧠 Embedding time');
  console.log(`✅ Done. Generated ${vectors.length} embedding vectors.`);
}).catch(err => {
  console.error('❌ Error during embedding:', err);
});
