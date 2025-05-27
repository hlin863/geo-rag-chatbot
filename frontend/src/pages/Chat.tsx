import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    const res = await axios.post('http://localhost:3001/ask', { question });
    setAnswer(res.data.answer);
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