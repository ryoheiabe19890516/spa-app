import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from '../src/components/Home/Home';
import Quiz from '../src/components/Quiz/Quiz';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
