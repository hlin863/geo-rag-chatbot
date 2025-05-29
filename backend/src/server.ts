import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { ask } from './scripts/askGeoBot';  // adjust path if needed

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
  const question = req.body.question;
  const timestamp = new Date().toISOString();

  try {
    const answer = await ask(question);  // 🧠 GeoBot answers here

    const outDir = path.resolve(__dirname, '../output');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const logFilePath = path.join(outDir, 'chat_log.json');
    const logEntry = { question, answer, timestamp };

    let chatLog: any[] = [];
    if (fs.existsSync(logFilePath)) {
      try {
        const rawLog = fs.readFileSync(logFilePath, 'utf-8');
        chatLog = JSON.parse(rawLog);
      } catch (parseErr) {
        console.warn('⚠️ Could not parse chat_log.json. Starting fresh.');
      }
    }

    chatLog.push(logEntry);
    fs.writeFileSync(logFilePath, JSON.stringify(chatLog, null, 2));
    console.log('✅ Appended to chat_log.json');

    res.send({ answer });
  } catch (err) {
    console.error('❌ Error:', err);
    return res.status(500).send({ answer: 'Server error occurred.' });
  }
});

app.listen(3001, () => {
  console.log('✅ Server is running at http://localhost:3001');
});