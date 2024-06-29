// frontend/src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leagues, setLeagues] = useState({});

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('https://ligaevg-6917d6adeeb9.herokuapp.com/leaderboard');
      const churches = response.data;

      const leaguesData = churches.reduce((acc, church) => {
        if (!acc[church.league]) {
          acc[church.league] = [];
        }
        acc[church.league].push(church);
        return acc;
      }, {});

      setLeagues(leaguesData);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      {Object.keys(leagues).map(league => (
        <div key={league}>
          <h2>{league}</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Place</th>
                <th>Church</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leagues[league]
                .sort((a, b) => b.points - a.points)
                .map((church, index) => (
                  <tr key={church.id}>
                    <td>{index + 1}</td>
                    <td>{church.name}</td>
                    <td>{church.points}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
