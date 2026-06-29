import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css';
import Home from './pages/Home';
import Chatroom from './pages/Chatroom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatroom />} />
      </Routes>
    </Router>
  );
}

export default App;
