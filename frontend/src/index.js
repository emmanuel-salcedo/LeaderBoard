import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://your-backend-url/leaderboard')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      {data.map(church => (
        <div key={church.id}>
          <h2>{church.name}</h2>
          <p>Points: {church.points}</p>
          <p>League: {church.league}</p>
        </div>
      ))}
    </div>
  );
}

ReactDOM.render(<Leaderboard />, document.getElementById('root'));
