// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Chat />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

export default App;
