import express, { Request, Response } from 'express';
import { queryRelevantChunks } from '../embedding/queryEmbeddings';
import { generateAnswer } from '../embedding/answerGenerator';

const router = express.Router();

router.post('/rag', async (req: Request, res: Response): Promise<void> => {
  const question = req.body.question;
  if (!question) {
    res.status(400).json({ error: 'Missing "question" in request body.' });
    return;
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