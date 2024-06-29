// src/components/Points.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Points = ({ churchId }) => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await axios.get(`/churches/${churchId}/points`);
                setPoints(response.data);
            } catch (error) {
                console.error("Error fetching points", error);
            }
        };

        fetchPoints();
    }, [churchId]);

    return (
        <div>
            <h3>Points</h3>
            <ul>
                {points.map((point) => (
                    <li key={point.id}>{point.description} - {point.points}</li>
                ))}
            </ul>
        </div>
    );
};

export default Points;
