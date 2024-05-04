// App.js
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserInterface from './components/UserInterface';
import AddData from './components/AddData';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/User" element={<UserInterface/>} />

        <Route path="/add" element={<AddData/>} />
      </Routes>
    </Router>
  );
}

export default App;
