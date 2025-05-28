// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import ragRoute from './api/ragRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', ragRoute);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});