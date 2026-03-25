import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleCard from './components/SingleCard';
import { cashPrompts, ladyItems } from './data/miniGames';
import CashMiniGame from './components/CashMiniGame';
import LadyMiniGame from './components/LadyMiniGame';


function App() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [players, setPlayers] = useState({
    player1: { name: "Player 1", points: 0, cashSuccessCount: 0 },
    player2: { name: "Player 2", points: 0, cashSuccessCount: 0 },
  });
  const [turnKey, setTurnKey] = useState('player1');

  // Mini-game state
  const [activeMiniGame, setActiveMiniGame] = useState(null); // 'cash' or 'lady'
  const [miniGameData, setMiniGameData] = useState(null);

  const cardImages = [
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
    { "src": "/img/bomb.png" },
    { "src": "/img/bomb.png" },
    { "src": "/img/bomb.png" },
    { "src": "/img/exchange.png" },
    { "src": "/img/exchange.png" },
    { "src": "/img/exchange.png" },
    { "src": "/img/lady.png" },
    { "src": "/img/lady.png" }
  ];

  //shufflecards
  const shufflecards = () => {
    const shuffled = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: Math.random(), number: index + 1 }))
    setCards(shuffled)
    setFlippedCards([])
    setTurnKey('player1')
    setPlayers({
      player1: { name: "Player 1", points: 0, cashSuccessCount: 0 },
      player2: { name: "Player 2", points: 0, cashSuccessCount: 0 },
    })
    setActiveMiniGame(null)
  }

  //handle choice
  const handleChoice = (card) => {
    if (activeMiniGame || flippedCards.find(c => c.id === card.id)) return;

    setFlippedCards(prev => [...prev, card]);

    if (card.src === "/img/bomb.png") {
      setTurnKey(prev => prev === 'player1' ? 'player2' : 'player1');
    }
    else if (card.src === "/img/cash.png") {
      const randomPrompt = cashPrompts[Math.floor(Math.random() * cashPrompts.length)];
      setMiniGameData(randomPrompt);
      setActiveMiniGame('cash');
    }
    else if (card.src === "/img/exchange.png") {
      setPlayers(prev => ({
        ...prev,
        player1: { ...prev.player1, points: prev.player2.points },
        player2: { ...prev.player2, points: prev.player1.points },
      }));
      setTurnKey(prev => prev === 'player1' ? 'player2' : 'player1');
    }
    else if (card.src === "/img/lady.png") {
      const shuffledItems = [...ladyItems].sort(() => 0.5 - Math.random()).slice(0, 4);
      setMiniGameData(shuffledItems);
      setActiveMiniGame('lady');
    }
  }

  const handleCashResult = (success) => {
    if (success) {
      setPlayers(prev => {
        const currentPlayer = prev[turnKey];
        const newSuccessCount = currentPlayer.cashSuccessCount + 1;
        const addedPoints = 50 * newSuccessCount;
        return {
          ...prev,
          [turnKey]: {
            ...currentPlayer,
            points: currentPlayer.points + addedPoints,
            cashSuccessCount: newSuccessCount
          }
        };
      });
    } else {
      // Turn ends on failure
      setTurnKey(prev => prev === 'player1' ? 'player2' : 'player1');
    }
    setActiveMiniGame(null);
  }

  const handleLadyResult = (deduction) => {
    setPlayers(prev => ({
      ...prev,
      [turnKey]: {
        ...prev[turnKey],
        points: Math.max(0, prev[turnKey].points - deduction)
      }
    }));
    setActiveMiniGame(null);
  }

  return (
    <div className='App'>
      <h1>Company</h1>
      <button onClick={shufflecards}>New Game</button>

      <div className="players-info">
        <div className={`player-box ${turnKey === 'player1' ? "currentPlayer" : ""}`}>
          <h2>{players.player1.name}</h2>
          <p className='pts'>{players.player1.points}</p>
          <p className='count'>Cash Cards: {players.player1.cashSuccessCount}</p>
        </div>
        <div className={`player-box ${turnKey === 'player2' ? "currentPlayer" : ""}`}>
          <h2>{players.player2.name}</h2>
          <p className='pts'>{players.player2.points}</p>
          <p className='count'>Cash Cards: {players.player2.cashSuccessCount}</p>
        </div>
      </div>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={flippedCards.some(c => c.id === card.id)}
          />
        ))}
      </div>

      {activeMiniGame === 'cash' && (
        <CashMiniGame prompt={miniGameData} onResult={handleCashResult} />
      )}
      {activeMiniGame === 'lady' && (
        <LadyMiniGame items={miniGameData} onResult={handleLadyResult} />
      )}
    </div>
  )
}

export default App
