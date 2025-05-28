import express, { Request, Response } from 'express';
import { queryRelevantChunks } from '../embedding/queryEmbeddings';
import { generateAnswer } from '../embedding/answerGenerator';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const outputDir = path.join(__dirname, '../../output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

router.post('/rag', async (req: Request, res: Response): Promise<void> => {
  const question = req.body.question;
  console.log('[📥] Received question:', question);

  if (!question) {
    console.log('[❌] No question provided');
    res.status(400).json({ error: 'Missing "question" in request body.' });
    return;
  }

  try {
    const start = Date.now();
    const retrievedChunks = await queryRelevantChunks(question, 5);
    const answer = await generateAnswer(question, retrievedChunks);
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);

    console.log('[✅] Generated answer:', answer);

    // Respond to frontend first
    res.json({ question, answer, retrievedChunks, timeTakenSeconds: elapsed });

    // Then attempt to write to log
    const logEntry = {
      timestamp: new Date().toISOString(),
      question,
      answer,
      retrievedChunks,
      timeTakenSeconds: elapsed,
    };

    const logFilePath = path.join(outputDir, 'chat_log.json');

    let logs: any[] = [];
    if (fs.existsSync(logFilePath)) {
      try {
        const raw = fs.readFileSync(logFilePath, 'utf-8');
        try {
          logs = JSON.parse(raw);
        } catch {
          console.warn('⚠️ Empty or invalid JSON log — resetting.');
          logs = [];
        }
      } catch (readErr) {
        console.warn('⚠️ Could not read previous logs. Starting new log file.');
      }
    }

    logs.push(logEntry);
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error('[🔥] Error in /rag route:', err);
    res.status(500).json({ error: 'Failed to generate answer.' });
  }
});

export default router;