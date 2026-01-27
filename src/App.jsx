import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleCard from './components/SingleCard';


function App() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [players, setPlayers] = useState({
    player1: { name: "Player 1", points: 0, nextCashValue: 1000 },
    player2: { name: "Player 2", points: 0, nextCashValue: 1000 },
  });
  /**automatically player 1's turn */
  const [turn, setTurn] = useState('player1');

  const cardImages = [
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
    { "src": "/img/cash.png" },
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
    setTurn('player1')
    setPlayers({
      player1: { name: "Player 1", points: 0, nextCashValue: 1000 },
      player2: { name: "Player 2", points: 0, nextCashValue: 1000 },
    })
  }

  //handle choice
  const handleChoice = (card) => {
    if (!flippedCards.find(c => c.id === card.id)) { // Prevent duplicate flips
      setFlippedCards([...flippedCards, card]); // Add the card to flippedCards
    }
    if (card.src === "/img/bomb.png") {
      setTurn(turn === 'player1' ? 'player2' : 'player1')
    }
    else if (card.src === "/img/cash.png") {
      setPlayers(prev => ({
        ...prev,
        [turn]: {
          ...prev[turn],
          points: prev[turn].points + prev[turn].nextCashValue,
          nextCashValue: prev[turn].nextCashValue + 1000,
        }
      }));
    }
    else if (card.src === "/img/exchange.png") {
      setTurn(turn === 'player1' ? 'player2' : 'player1')
      setPlayers(prev => ({
        ...prev,
        player1: { ...prev.player1, points: prev.player2.points },
        player2: { ...prev.player2, points: prev.player1.points },
      }))
    }
    else if (card.src === "/img/lady.png") {
      setPlayers(prev => ({
        ...prev,
        [turn]: { ...prev[turn], points: prev[turn].points - 10 }
      }))
    }

  }

  return (
    <div className='App'>
      <h1>Company</h1>
      <button onClick={shufflecards}>New Game</button>
      <h1 className={`player1 ${turn === 'player1' ? "currentPlayer" : ""}`}>Player1</h1>
      <h1 className={`player2 ${turn === 'player2' ? "currentPlayer" : ""}`}>Player2</h1>
      <h1 className='pts1'>{players.player1.points}</h1>
      <h1 className='pts2'>{players.player2.points}</h1>
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
    </div>
  )
}

export default App
