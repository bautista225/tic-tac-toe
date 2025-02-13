import { TURNS } from "../logic/constants";
import { useTicTacToe } from "../hooks/useTicTacToe";
import { Cell } from "./Cell";
import { EndGameModal } from "./EndGameModal";

export const TicTacToeBoard = () => {
  const { board, turn, winner, resetBoard, updateBoard } = useTicTacToe();

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
};
