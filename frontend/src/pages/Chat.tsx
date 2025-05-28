import { useState } from 'react';
import './Chat.css';
import axios from 'axios';

export default function Chat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    try {
      const res = await axios.post('http://localhost:3001/ask', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error('Error fetching answer:', err);
      setAnswer('❌ Failed to get response. Please make sure the backend is running.');
    }
  };

  return (
    <div className="chat-container">
      <h1>Geo-RAG Chatbot</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me a question about geology..."
      />
      <button onClick={askQuestion}>Ask</button>
      <div className="answer"><strong>Answer:</strong> {answer}</div>
    </div>
  );
}