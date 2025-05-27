import fs from 'fs';
import path from 'path';
import { queryRelevantChunks } from '../embedding/queryEmbeddings';
import { generateAnswer } from '../embedding/answerGenerator';

const questions = [
  "Why can't I add 251 curve shades to my log?",
  "What is the maximum number of data points allowed per curve?",
  "I want to use the name \"Hydrocarbon bearing zone highlighted\" as my curve shade name. Why is it not allowed?",
  "What is the maximum number of curves I can load in a data file?",
  "I have already added 20,000 modifiers to my log. Why can't I add more?",
  "How many log headers can I add to my log?",
  "How many tadpole definitions am I allowed to create?",
  "Why can't I add another layout to my log?"
];

const resultsDir = path.join(__dirname, '../../results');
const outputFile = path.join(resultsDir, 'geo-eval-results.json');

async function runEvaluation() {
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }

  const results: {
    question: string;
    answer: string;
    timeInMs: number;
  }[] = [];

  for (const question of questions) {
    console.log(`\n🧠 Question: ${question}`);
    const start = Date.now();

    const chunks = await queryRelevantChunks(question);
    const answer = await generateAnswer(question, chunks);

    const elapsed = Date.now() - start;

    console.log(`💬 Answer: ${answer}`);
    console.log(`⏱️ Time: ${elapsed} ms`);

    results.push({
      question,
      answer,
      timeInMs: elapsed
    });
  }

  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n📁 Saved evaluation results to: ${outputFile}`);
}

runEvaluation().catch(err => console.error('❌ Evaluation error:', err));