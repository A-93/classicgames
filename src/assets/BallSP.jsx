import React, { useState, useEffect } from 'react';

const BallSP = ({
  leftPaddleY,
  rightPaddleY,
  setLeftScore,
  setRightScore,
  moveCPUPaddle,
}) => {
  const [x, setX] = useState(window.innerWidth / 2);
  const [y, setY] = useState(window.innerHeight / 2);
  const ballSpeed = window.innerWidth < 768 ? 20 : window.innerWidth < 1025 ? 15 : 10;
  const scaleFactor = Math.min(window.innerWidth / 1920, window.innerHeight / 1080) * 1.2; // Updated scaleFactor calculation
  const [dx, setDx] = useState(Math.random() < 0.5 ? -ballSpeed * scaleFactor : ballSpeed * scaleFactor);
  const [dy, setDy] = useState(Math.random() < 0.5 ? -ballSpeed * scaleFactor : ballSpeed * scaleFactor);

  const ballSize = 20;
  const paddleWidth = 20;
  const paddleHeight = 130;

  const resetBall = () => {
    setX(window.innerWidth / 2);
    setY(window.innerHeight / 2);
    setDx(Math.random() < 0.5 ? -ballSpeed * scaleFactor : ballSpeed * scaleFactor);
    setDy(Math.random() < 0.5 ? -ballSpeed * scaleFactor : ballSpeed * scaleFactor);
  };

  useEffect(() => {
    const updateBallPosition = () => {
      let newX = x + dx;
      let newY = y + dy;

      // Paddle collision detection
      const leftPaddleTop = leftPaddleY * (window.innerHeight / 100);
      const leftPaddleBottom = leftPaddleTop + paddleHeight;
      const leftPaddleLeft = 0;
      const leftPaddleRight = paddleWidth;

      const rightPaddleTop = rightPaddleY * (window.innerHeight / 100);
      const rightPaddleBottom = rightPaddleTop + paddleHeight;
      const rightPaddleLeft = window.innerWidth - paddleWidth;
      const rightPaddleRight = window.innerWidth;

      if (
        newX <= leftPaddleRight &&
        newY + ballSize >= leftPaddleTop &&
        newY <= leftPaddleBottom
      ) {
        setDx(-dx); // Reverse direction
        newX = leftPaddleRight + ballSize; // Position the ball just outside the paddle
      }

      if (
        newX + ballSize >= rightPaddleLeft &&
        newY + ballSize >= rightPaddleTop &&
        newY <= rightPaddleBottom
      ) {
        setDx(-dx); // Reverse direction
        newX = rightPaddleLeft - ballSize; // Position the ball just outside the paddle
      }

      // Wall collision detection (top and bottom)
      if (newY <= 0) {
        setDy(-dy); // Reverse direction
        newY = 0; // Keep ball within bounds
      } else if (newY + ballSize >= window.innerHeight) {
        setDy(-dy); // Reverse direction
        newY = window.innerHeight - ballSize; // Keep ball within bounds
      }

      // Check if the ball has gone out of bounds on the left or right
      if (newX < 0) {
        setRightScore((prevScore) => prevScore + 1); // Increment right score
        resetBall(); // Respawn ball
        return; // Exit without setting new position
      }

      if (newX + ballSize > window.innerWidth) {
        setLeftScore((prevScore) => prevScore + 1); // Increment left score
        resetBall(); // Respawn ball
        return; // Exit without setting new position
      }

      setX(newX);
      setY(newY);

      // Move the CPU paddle
      moveCPUPaddle(newY);
    };

    const intervalId = setInterval(updateBallPosition, 16); // 60fps
    return () => clearInterval(intervalId);
  }, [x, y, dx, dy, leftPaddleY, rightPaddleY, setLeftScore, setRightScore, moveCPUPaddle]);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        backgroundColor: 'white',
        borderRadius: '50%',
      }}
    />
  );
};

export default BallSP;