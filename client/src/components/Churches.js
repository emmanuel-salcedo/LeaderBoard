// src/components/Churches.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Churches = ({ leagueId }) => {
    const [churches, setChurches] = useState([]);

    useEffect(() => {
        const fetchChurches = async () => {
            try {
                const response = await axios.get(`/leagues/${leagueId}/churches`);
                setChurches(response.data);
            } catch (error) {
                console.error("Error fetching churches", error);
            }
        };

        fetchChurches();
    }, [leagueId]);

    return (
        <div>
            <h2>Churches</h2>
            <ul>
                {churches.map((church) => (
                    <li key={church.id}>{church.name} - Points: {church.totalPoints}</li>
                ))}
            </ul>
        </div>
    );
};

export default Churches;
