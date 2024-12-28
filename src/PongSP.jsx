import React, { useState, useEffect } from 'react';
import BallSP from './assets/BallSP.jsx';

function PongSP() {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [leftPaddleY, setLeftPaddleY] = useState(50);
  const [rightPaddleY, setRightPaddleY] = useState(50);
  const [keysPressed, setKeysPressed] = useState({});

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
    const movePaddle = () => {
      if (keysPressed['ArrowUp']) {
        setLeftPaddleY((prevY) => Math.max(0, prevY - 5));
      }
      if (keysPressed['ArrowDown']) {
        setLeftPaddleY((prevY) => Math.min(90, prevY + 5));
      }
    };

    const intervalId = setInterval(movePaddle, 16); // 16ms = 60fps
    return () => clearInterval(intervalId);
  }, [keysPressed, leftPaddleY]);

  const moveCPUPaddle = (ballY) => {
    console.log('moveCPUPaddle called with ballY:', ballY);
    const baseSpeed = 1.5; // Base speed of the CPU paddle
    const paddleHeight = 130;

    // Random factor to add a bit of unpredictability in speed
    const randomFactor = Math.random() * 0.5; 
    const paddleSpeed = baseSpeed + randomFactor;

    const cpuPaddleY = rightPaddleY * (window.innerHeight / 100) + paddleHeight / 2;

    // Introduce a miss chance only when ball is detected
    if (ballY > cpuPaddleY + paddleHeight / 2 && Math.random() > 0.3) {
      // The CPU is moving down when the ball is below the paddle
      console.log('Moving paddle down');
      setRightPaddleY((prevY) => Math.min(90, prevY + paddleSpeed));
    } else if (ballY < cpuPaddleY - paddleHeight / 2 && Math.random() > 0.3) {
      // The CPU is moving up when the ball is above the paddle
      console.log('Moving paddle up');
      setRightPaddleY((prevY) => Math.max(0, prevY - paddleSpeed));
    } else {
      // CPU misses the ball
      console.log('CPU missed!');
    }
  };

  return (
    <div>
      <BallSP
        leftPaddleY={leftPaddleY}
        rightPaddleY={rightPaddleY}
        setLeftScore={setLeftScore}
        setRightScore={setRightScore}
        moveCPUPaddle={moveCPUPaddle}
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

export default PongSP;