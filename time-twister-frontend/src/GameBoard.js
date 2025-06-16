import React from 'react';
import './GameBoard.css';

const GRID_SIZE = 5; // Can change to 10 or more

function GameBoard({ position }) {
  const rows = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    const cells = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      const isPlayer = position.x === x && position.y === y;
      cells.push(
        <div key={`${x}-${y}`} className={`cell ${isPlayer ? 'player' : ''}`}>
          {isPlayer ? '🧍' : ''}
        </div>
      );
    }
    rows.push(
      <div key={y} className="row">
        {cells}
      </div>
    );
  }

  return <div className="game-board">{rows}</div>;
}

export default GameBoard;
