// time-twister-frontend/src/App.js
import React, { useState, useEffect } from "react";
import { getGameState, postMove } from "./api";
import "./styles.css";
import { undoMove } from "./api"; 

const maze = [
  [" ", " ", " ", " ", " "],
  [" ", "█", " ", "█", " "],
  [" ", " ", "█", " ", " "],
  [" ", "█", " ", " ", " "],
  [" ", " ", " ", " ", " "]
];

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 4, y: 4 });
  const [won, setWon] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [started, setStarted] = useState(false);
  

  const fetchState = async () => {
    const data = await getGameState();
    const pos = data.x !== undefined ? data : data.position;
    setPosition(pos);
    setTarget(data.target || { x: 4, y: 4 }); // fallback if target not sent
    setWon(pos.x === (data.target?.x || 4) && pos.y === (data.target?.y || 4));
  };

const handleMove = (direction) => {
  const { x, y } = position;
  let newX = x;
  let newY = y;

  // Calculate new position
  if (direction === "UP") 
    newY -= 1 ;
  else if (direction === "DOWN") 
    newY += 1;
  else if (direction === "LEFT") 
    newX -= 1;
  else if (direction === "RIGHT") 
    newX += 1;
  

  // Boundary check
  if (
    newY < 0 || newY >= maze.length ||         // top/bottom boundary
    newX < 0 || newX >= maze[0].length         // left/right boundary
  ) {
    return; // invalid move: out of bounds
  }

  // Wall check
  if (maze[newY][newX] === "█") {
    return; // invalid move: hit a wall
  }

  // Valid move
  setPosition({ x: newX, y: newY });
  setMoveHistory((prev) => [...prev, direction]);

  if (target.x === newX && target.y === newY) {
    setWon(true);
    alert("🎉 You reached the target! 🎉");
  }
};

const handleStart = () => {
  setStarted(true);
  setPosition({ x: 1, y: 2 }); // or your start coordinates
  setMoveHistory([]);
  setWon(false);
};

const handleReset = () => {
  setPosition({ x: 1, y: 2 }); // or your start coordinates
  setMoveHistory([]);
  setWon(false);
};

  const handleUndo = () => {
  if (moveHistory.length === 0) return;

  const lastMove = moveHistory[moveHistory.length - 1];
  const inverseMove = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT"
  };

  const dx = { LEFT: -1, RIGHT: 1, UP: 0, DOWN: 0 };
  const dy = { UP: -1, DOWN: 1, LEFT: 0, RIGHT: 0 };

  const newX = position.x + dx[inverseMove[lastMove]];
  const newY = position.y + dy[inverseMove[lastMove]];

  // Optional: Check for bounds or walls if needed here too

  setPosition({ x: newX, y: newY });
  setMoveHistory(prev => prev.slice(0, -1));
};



  useEffect(() => {
    fetchState();
  }, []);
//   if (!maze || !position || !target) {
//   return <div>Loading game...</div>;
// }

  return (
    <div className="container">
      <h1>Time Twister Maze 🌀</h1>
      {!started ? (
    <button onClick={handleStart}>Start Game</button>
  ) : (
    <>
      {won && <h2 className="win">🎉 You reached the goal! 🎉</h2>}
      <div className="grid">
        {maze.map((row, y) => (
          <div key={y} className="row">
            {row.map((cell, x) => {
              const isPlayer = position.x === x && position.y === y;
              const isTarget = target.x === x && target.y === y;
              return (
                <div key={x} className={`cell ${cell === "█" ? "wall" : ""}`}>
                  {isPlayer ? "🧍" : isTarget ? "🏁" : cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      
    </>
  )}
      
      <div className="controls">
        <button onClick={() => handleMove("UP")}>↑</button>
        <div>
          <button onClick={() => handleMove("LEFT")}>←</button>
          <button onClick={() => handleMove("RIGHT")}>→</button>
        </div>
        <button onClick={() => handleMove("DOWN")}>↓</button>
      </div>

      <div className="actions">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="container">

</div>


    </div>
  );
}

export default App;
