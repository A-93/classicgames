import React from 'react';
import { createRoot } from 'react-dom/client';
import GameSelector from './GameSelector';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameSelector />
  </React.StrictMode>
);