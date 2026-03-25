import React, { useState, useEffect, useRef } from 'react';
import './MiniGame.css';

export default function LadyMiniGame({ items, onResult }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [phase, setPhase] = useState('selection'); // 'selection' or 'slider'
  const [sliderPos, setSliderPos] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isStopped, setIsStopped] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  const requestRef = useRef();

  const animateSlider = () => {
    setSliderPos(prev => {
      let next = prev + direction * 2;
      if (next >= 100 || next <= 0) {
        setDirection(d => -d);
      }
      return next;
    });
    requestRef.current = requestAnimationFrame(animateSlider);
  };

  useEffect(() => {
    if (phase === 'slider' && !isStopped) {
      requestRef.current = requestAnimationFrame(animateSlider);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [phase, isStopped, direction]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setPhase('slider');
  };

  const stopSlider = () => {
    setIsStopped(true);
    cancelAnimationFrame(requestRef.current);

    // Check if slider is in the "sweet spot" (45% - 55%)
    const isHit = sliderPos >= 45 && sliderPos <= 55;
    const deduction = isHit ? selectedItem.bargain : selectedItem.luxury;

    setFinalResult({
      isHit,
      deduction
    });

    setTimeout(() => {
      onResult(deduction);
    }, 2000);
  };

  return (
    <div className="mini-game-overlay">
      <div className="mini-game-content">
        <h2>The Lady's Shop</h2>
        {phase === 'selection' && (
          <>
            <p>Pick an item to pitch to the Lady!</p>
            <div className="lady-items">
              {items.map((item, index) => (
                <div key={index} className="lady-item" onClick={() => handleSelectItem(item)}>
                  {item.name}
                </div>
              ))}
            </div>
          </>
        )}
        {phase === 'slider' && (
          <>
            <p>Pitching: {selectedItem.name}</p>
            <p>Stop the slider in the green "Sweet Spot" to get the Bargain Price!</p>
            <div className="slider-container" onClick={!isStopped ? stopSlider : undefined}>
              <div className="sweet-spot"></div>
              <div className="slider-track" style={{ left: `${sliderPos}%` }}></div>
            </div>
            {!isStopped && <button className="btn btn-primary" onClick={stopSlider}>STOP!</button>}
            {isStopped && finalResult && (
              <div className="result">
                <h3>{finalResult.isHit ? "Great Bargain!" : "Too Expensive!"}</h3>
                <p>Price: ${finalResult.deduction}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
