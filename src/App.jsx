import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Cell } from "./components/Cell";
import { TURNS, WINNER_OPTIONS } from "./constants";
import { checkHasWinner, getFirstTurn } from "./logic/board";
import { EndGameModal } from "./components/EndGameModal";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(getFirstTurn());
  const [winner, setWinner] = useState(WINNER_OPTIONS.NONE);

  const checkHasEnded = (board) => board.every((cell) => cell !== null);

  const updateBoard = (index) => {
    if (winner || board[index]) return;

    const updatedBoard = [...board];
    updatedBoard[index] = turn;
    setBoard(updatedBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkHasWinner(updatedBoard);
    console.log({ newWinner });
    if (newWinner) {
      confetti();
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

      <EndGameModal winner={winner} handleNewGame={resetBoard} />
    </main>
  );
}

export default App;
