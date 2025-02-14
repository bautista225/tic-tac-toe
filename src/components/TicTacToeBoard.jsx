import { TURNS } from "../logic/constants";
import { useTicTacToe } from "../hooks/useTicTacToe";
import { Cell } from "./Cell";
import { EndGameModal } from "./EndGameModal";
import { Turn } from "./Turn";
import "./TicTacToeBoard.css";

export const TicTacToeBoard = () => {
  const { board, turn, winner, resetBoard, updateBoard } = useTicTacToe();

  return (
    <main className="board">
      <h1>Tic tac toe</h1>

      <section className="turn">
        <Turn isSelected={turn === TURNS.X}>{TURNS.X}</Turn>
        <Turn isSelected={turn === TURNS.O}>{TURNS.O}</Turn>
      </section>

      <section className="game">
        {board.map((_, index) => (
          <Cell key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Cell>
        ))}
      </section>

      <button onClick={resetBoard}>Reset game</button>

      <EndGameModal winner={winner} handleNewGame={resetBoard} />
    </main>
  );
};
