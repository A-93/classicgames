import React from 'react';

const GameModeSelection = ({ onSinglePlayerClick, onMultiplayerClick }) => {
  return (
    <div>
      <h1>Choose Game Mode</h1>
      <button onClick={onSinglePlayerClick}>Single Player</button>
      <button onClick={onMultiplayerClick}>Multiplayer</button>
    </div>
  );
};

export default GameModeSelection;