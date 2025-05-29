// server.ts or app.ts (your Express server)
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
  const data = { question, timestamp: Date.now() };

  try {
    const outDir = path.resolve(__dirname, '../output');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const filePath = path.join(outDir, 'test.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('✅ Written to file:', filePath);

    const answer = await ask(question);  // 🧠 GeoBot answers here
    res.send({ answer });
  } catch (err) {
    console.error('❌ Error:', err);
    return res.status(500).send({ answer: 'Server error occurred.' });
  }
});

app.listen(3001, () => {
  console.log('✅ Server is running at http://localhost:3001');
});