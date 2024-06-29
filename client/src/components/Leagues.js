// src/components/Leagues.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leagues = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await axios.get('/leagues');
                setLeagues(response.data);
            } catch (error) {
                console.error("Error fetching leagues", error);
            }
        };

        fetchLeagues();
    }, []);

    return (
        <div>
            <h1>Leagues</h1>
            <ul>
                {leagues.map((league) => (
                    <li key={league.id}>{league.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leagues;
