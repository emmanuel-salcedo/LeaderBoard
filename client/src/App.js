// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leagues from './components/Leagues';
import Churches from './components/Churches';
import Points from './components/Points';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Leaderboard App</h1>
                </header>
                <Routes>
                    <Route path="/" element={<Leagues />} />
                    <Route path="/leagues/:leagueId/churches" element={<Churches />} />
                    <Route path="/churches/:churchId/points" element={<Points />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
