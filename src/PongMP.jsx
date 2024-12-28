// PongMP.jsx
import React, { useState, useEffect } from 'react';
import Ball from './assets/BallMP.jsx';

function PongMP() {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [leftPaddleY, setLeftPaddleY] = useState(50);
  const [rightPaddleY, setRightPaddleY] = useState(50);
  const [keysPressed, setKeysPressed] = useState({});
  const [touchStarted, setTouchStarted] = useState(false);
  const [touchY, setTouchY] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prevKeys) => ({ ...prevKeys, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevKeys) => ({ ...prevKeys, [event.key]: false }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const movePaddles = () => {
      if (keysPressed['ArrowUp']) {
        setRightPaddleY((prevY) => Math.max(0, prevY - 5));
      }
      if (keysPressed['ArrowDown']) {
        setRightPaddleY((prevY) => Math.min(90, prevY + 5));
      }
      if (keysPressed['w']) {
        setLeftPaddleY((prevY) => Math.max(0, prevY - 5));
      }
      if (keysPressed['s']) {
        setLeftPaddleY((prevY) => Math.min(90, prevY + 5));
      }
    };

    const intervalId = setInterval(movePaddles, 16); // 16ms = 60fps
    return () => clearInterval(intervalId);
  }, [keysPressed, leftPaddleY, rightPaddleY]);

  const handleTouchStart = (event) => {
    setTouchStarted(true);
    setTouchY(event.touches[0].clientY);
  };

  const handleTouchMove = (event) => {
    if (touchStarted) {
      const newY = event.touches[0].clientY;
      const deltaY = newY - touchY;
      setTouchY(newY);

      if (event.touches[0].clientX < window.innerWidth / 2) {
        // Left paddle
        setLeftPaddleY((prevY) => Math.max(0, prevY + deltaY / 5));
      } else {
        // Right paddle
        setRightPaddleY((prevY) => Math.max(0, prevY + deltaY / 5));
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStarted(false);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Ball
        leftPaddleY={leftPaddleY}
        rightPaddleY={rightPaddleY}
        setLeftScore={setLeftScore}
        setRightScore={setRightScore}
      />
      <div className="score">{leftScore} : {rightScore}</div>
      <div
        className="left-paddle"
        style={{ top: `${leftPaddleY}%`, height: `${130}px` }}
      ></div>
      <div
        className="right-paddle"
        style={{ top: `${rightPaddleY}%`, height: `${130}px` }}
      ></div>
    </div>
  );
}

export default PongMP;