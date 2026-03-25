import React, { useState, useEffect } from 'react';
import './MiniGame.css';

export default function CashMiniGame({ prompt, onResult }) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      onResult(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onResult]);

  return (
    <div className="mini-game-overlay">
      <div className="mini-game-content">
        <h2>Cash Mini-Game</h2>
        <p className="prompt">{prompt}</p>
        <div className="timer">Time Left: {timeLeft}s</div>
        <div className="actions">
          <button className="btn btn-success" onClick={() => onResult(true)}>Success</button>
          <button className="btn btn-danger" onClick={() => onResult(false)}>Fail</button>
        </div>
        <p className="hint">The other player must judge your performance!</p>
      </div>
    </div>
  );
}
