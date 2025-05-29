import { queryRelevantChunks } from '../embedding/queryEmbeddings';
import { generateAnswer } from '../embedding/answerGenerator';

// const question = 'What are the maximum limits of lithology types per plot?';

export async function ask(question: string) {
  console.log(`🧠 Question: ${question}\n`);

  const chunks = await queryRelevantChunks(question);
  console.log(`📚 Retrieved ${chunks.length} context chunks.\n`);

  console.time('⏱️ Answer generation time');

  const answer = await generateAnswer(question, chunks);

  console.timeEnd('⏱️ Answer generation time');

  console.log(`\n💬 Answer:\n${answer}`);
}