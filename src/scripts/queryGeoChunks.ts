import { queryRelevantChunks } from '../embedding/queryEmbeddings';

const question = 'What is the maximum number of curves allowed per plot?';

queryRelevantChunks(question).then(results => {
  console.log(`🔎 Results for: "${question}"\n`);
  results.forEach((chunk, i) => {
    console.log(`Result ${i + 1}:\n${chunk}\n`);
  });
}).catch(err => {
  console.error('❌ Query error:', err);
});
