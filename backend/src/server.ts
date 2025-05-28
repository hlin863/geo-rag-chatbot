import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import ragRoute from './api/ragRoute';

const PORT = 3001; // Match frontend expectations
const app = express();

// Middleware
app.use(cors());                  // Enable cross-origin requests
app.use(express.json());         // Parse incoming JSON bodies
app.use(morgan('dev'));          // Log incoming HTTP requests

// API routes
app.use('/api', ragRoute);

// Health check
app.get('/', (_req, res) => {
  res.send('🟢 Geo-RAG Backend is running on port 3001.');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
