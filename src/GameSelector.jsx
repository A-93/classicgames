import React, { useState } from 'react';
import PongSP from './PongSP';
import PongMP from './PongMP';
import Tetris from './Tetris';
import Snake from './Snake';
import GameModeSelection from './assets/GameMode.jsx';
import './App.css';

const GameSelector = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedPongMode, setSelectedPongMode] = useState(null);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handlePongModeSelect = (mode) => {
    setSelectedPongMode(mode);
  };

  return (
    <div>
      {selectedGame === null && (
        <div>
          <h1>Select a Game</h1>
          <ul>
            <li onClick={() => handleGameSelect('pong')}>Pong</li>
            <li onClick={() => handleGameSelect('tetris')}>Tetris</li>
            <li onClick={() => handleGameSelect('snake')}>Snake</li>
          </ul>
        </div>
      )}
      {selectedGame === 'pong' && selectedPongMode === null && (
        <GameModeSelection
          onSinglePlayerClick={() => handlePongModeSelect('single-player')}
          onMultiplayerClick={() => handlePongModeSelect('multiplayer')}
        />
      )}
      {selectedGame !== null && selectedPongMode !== null && (
        <div>
          {selectedGame === 'pong' && selectedPongMode === 'single-player' && (
            <PongSP />
          )}
          {selectedGame === 'pong' && selectedPongMode === 'multiplayer' && (
            <PongMP />
          )}
          {selectedGame === 'tetris' && <Tetris />}
          {selectedGame === 'snake' && <Snake />}
        </div>
      )}
    </div>
  );
};

export default GameSelector;