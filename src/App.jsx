import { useState } from 'react'
import './App.css'
import ReactCardFlip from 'react-card-flip'
import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleCard from './components/SingleCard';


function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [choice, setChoice] = useState(null);
  const [players, setPlayers] = useState({
    player1: { name: "Player 1", points: 0 },
    player2: { name: "Player 2", points: 0 },
  });
  /**automatically player 1's turn */
  const [turn, setTurn] = useState(players.player1);
  const [cashCount, setCCount] = useState(0);

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
    setTurn(players.player1)
    players.player1.points = 0;
    players.player2.points = 0;
  }

  //handle choice
  const handleChoice = (card) => {
    setChoice(card)
    if (!flippedCards.find(c => c.id === card.id)) { // Prevent duplicate flips
      setFlippedCards([...flippedCards, card]); // Add the card to flippedCards
    }
    if (card.src === "/img/bomb.png") {
      if (turn === players.player1) {
        setTurn(players.player2)
      }
      else {
        setTurn(players.player1)
      }
    }
    else if (card.src === "/img/cash.png") {
      turn.points += 50
    }
    else if (card.src === "/img/exchange.png") {
      if (turn === players.player1) {
        setTurn(players.player2)
      }
      else {
        setTurn(players.player1)
      }
      const tempPoints = players.player1.points
      players.player1.points = players.player2.points
      players.player2.points = tempPoints
    }
    else if (card.src === "/img/lady.png") {
      turn.points -= 10
    }

  }

  return (
    <div className='App'>
      <h1>Company</h1>
      <button onClick={shufflecards}>New Game</button>
      <h1 className={`player1 ${turn === players.player1 ? "currentPlayer" : ""}`}>Player1</h1>
      <h1 className={`player2 ${turn === players.player2 ? "currentPlayer" : ""}`}>Player2</h1>
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
