import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "×",
  O: "o",
};

const WINNER_OPTIONS = {
  X: TURNS.X,
  O: TURNS.O,
  TIE: "-",
  NONE: null,
};

const getFirstTurn = () => {
  return Object.values(TURNS)[Math.floor(Math.random() * 2)];
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

const Cell = ({ children, updateBoard, index, isSelected }) => {
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
  const [turn, setTurn] = useState(getFirstTurn());
  const [winner, setWinner] = useState(WINNER_OPTIONS.NONE);

  const checkHasWinner = (board) => {
    let player = null;
    const winner = WINNING_COMBINATIONS.some((pattern) => {
      player = board[pattern[0]] ?? false;
      return pattern.every((cellIndex) => board[cellIndex] === player);
    });

    return winner ? player : null;
  };

  const checkHasEnded = (board) => board.every((cell) => cell !== null);

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
    } else if (checkHasEnded(updatedBoard)) {
      setWinner(WINNER_OPTIONS.TIE);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setTurn(getFirstTurn());
    setWinner(WINNER_OPTIONS.NONE);
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetBoard}>Reset game</button>
      <section className="game">
        {board.map((_, index) => (
          <Cell key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Cell>
        ))}
      </section>

      <section className="turn">
        <Cell isSelected={turn === TURNS.X}>{TURNS.X}</Cell>
        <Cell isSelected={turn === TURNS.O}>{TURNS.O}</Cell>
      </section>

      {winner !== WINNER_OPTIONS.NONE && (
        <section className="winner">
          <div className="text">
            <h2>
              {winner === WINNER_OPTIONS.TIE
                ? "We have a tie"
                : `Congratulations to:`}
            </h2>
            <header className="win">
              <Cell>{winner}</Cell>
            </header>
            <footer>
              <button onClick={resetBoard}>New game</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
