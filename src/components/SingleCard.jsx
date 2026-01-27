import PropTypes from 'prop-types';
import './SingleCard.css'
import PropTypes from 'prop-types';

export default function SingleCard({ card, handleChoice, flipped }) {

    SingleCard.propTypes = {
        card: PropTypes.shape({
            src: PropTypes.string.isRequired,
            number: PropTypes.number.isRequired
        }).isRequired,
        handleChoice: PropTypes.func.isRequired,
        flipped: PropTypes.bool.isRequired,
    };

    const handleClick = () => {
        handleChoice(card)
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                <div className="back" onClick={handleClick}>
                    {card.number}
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
