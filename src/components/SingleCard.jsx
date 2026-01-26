import PropTypes from 'prop-types';
import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped }) {

    const handleClick = () => {
        handleChoice(card)
    }
    return (
        <div className="flip-card" onClick={handleClick}>
            <div className={`inner-card ${flipped ? 'flipped' : ''}`}>
                <div className="front">
                    <img src={card.src} alt="card front" />
                </div>
                <div className="back">
                    <img className="back-image" src="/img/back.png" alt="card back" />
                    <span className="card-number">{card.number}</span>
                </div>
            </div>
        </div>
    )
}

SingleCard.propTypes = {
    card: PropTypes.shape({
        src: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
    }).isRequired,
    handleChoice: PropTypes.func.isRequired,
    flipped: PropTypes.bool.isRequired,
};
