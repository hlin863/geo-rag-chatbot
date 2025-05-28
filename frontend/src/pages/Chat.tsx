import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/rag', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error('Error fetching answer:', err);
      setAnswer('❌ Failed to get response. Please make sure the backend is running.');
    }
  };

  return (
    <div>
      <h1>Geo-RAG Chatbot</h1>
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
      <button onClick={askQuestion}>Ask</button>
      <div><strong>Answer:</strong> {answer}</div>
    </div>
  );
}