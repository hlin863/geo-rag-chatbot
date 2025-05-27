import path from 'path';
import { extractGeoLimitsFromTable, chunkTextRows } from '../ingestion/htmlLoader';

const filePath = path.join(__dirname, '../../tests/test-pages/limits/GEO_Limits.htm');
const rows = extractGeoLimitsFromTable(filePath);
const chunks = chunkTextRows(rows, 500);

console.log(`✅ Total rows: ${rows.length}`);
console.log(`🧩 Chunks: ${chunks.length}`);
chunks.forEach((chunk, i) => {
  console.log(`\nChunk ${i + 1}:\n${chunk}`);
});