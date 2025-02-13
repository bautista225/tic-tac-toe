import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "×",
  O: "o",
};

const WINNERS = {
  X: "×",
  O: "o",
  TIE: "-",
  NONE: null,
};

const generateWinPatterns = (size) => {
  const patterns = [];

  // Definning winnning rows
  for (let i = 0; i < size; i++) {
    patterns.push([...Array(size)].map((_, j) => i * size + j));
  }

  // Definning winnning columns
  for (let i = 0; i < size; i++) {
    patterns.push([...Array(size)].map((_, j) => j * size + i));
  }

  // Definning diagonal 1 (\)
  patterns.push([...Array(size)].map((_, i) => i * (size + 1)));

  // Definning diagonal 2 (/)
  patterns.push([...Array(size)].map((_, i) => (i + 1) * (size - 1)));

  return patterns;
};

const WINNING_COMBINATIONS = generateWinPatterns(3);

const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(
    [TURNS.X, TURNS.O][Math.floor(Math.random() * 2)]
  );
  const [winner, setWinner] = useState(WINNERS.NONE);

  const checkHasWinner = (board) => {
    let player = null;

    const winner = WINNING_COMBINATIONS.some((pattern) => {
      player = board[pattern[0]];
      return pattern.every((index) => board[index] === player);
    });

    return winner ? player : null;
  };

  const updateBoard = (index) => {
    if (winner || board[index]) return;

    const updatedBoard = [...board];
    updatedBoard[index] = turn;
    setBoard(updatedBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkHasWinner(updatedBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>

      <section className="game">
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
