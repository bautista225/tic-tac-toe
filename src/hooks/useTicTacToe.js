import confetti from "canvas-confetti";
import { useState } from "react";
import { TURNS, WINNER_OPTIONS } from "../logic/constants";
import { checkHasWinner, getFirstTurn } from "../logic/board";

export const useTicTacToe = () => {
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

  return { board, turn, winner, resetBoard, updateBoard };
};
