import express, { Request, Response } from 'express';
import path from 'path';
import { extractGeoLimitsFromTable, chunkTextRows } from '../ingestion/htmlLoader';
import { queryRelevantChunks } from '../embedding/queryEmbeddings';
import { generateAnswer } from '../embedding/answerGenerator';

const router = express.Router();

// Load data once
const limitsPath = path.join(__dirname, '../../tests/test-pages/limits/GEO_Limits.htm');
const rows = extractGeoLimitsFromTable(limitsPath);
const contextChunks = chunkTextRows(rows, 500);

// Route
router.post('/rag', async (req: Request, res: Response) => {
  const question = req.body.question;
  if (!question) {
    return res.status(400).json({ error: 'Missing "question" in request body.' });
  }

  try {
    const start = Date.now();
    const retrievedChunks = await queryRelevantChunks(question, 5);
    const answer = await generateAnswer(question, retrievedChunks);
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);

    res.json({ question, answer, retrievedChunks, timeTakenSeconds: elapsed });
  } catch (err) {
    console.error('Error in /rag:', err);
    res.status(500).json({ error: 'Failed to generate answer.' });
  }
});

export default router;
