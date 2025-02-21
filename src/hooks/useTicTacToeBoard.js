import { useState } from "react";
import { TURNS, WINNER_OPTIONS } from "../logic/constants";
import { checkHasEnded, checkHasWinner, getInitialTurn } from "../logic/board";
import { useEffect } from "react";

export const useTicTacToeBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(WINNER_OPTIONS.NONE);

  const updateBoard = (index) => {
    if (winner || board[index]) return;

    const updatedBoard = [...board];
    updatedBoard[index] = turn;
    setBoard(updatedBoard);

    if (!checkHasWinner(updatedBoard)) {
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
    }
  };

  const setNewBoard = (gameRecovery) => {
    console.log("Setting new board with", gameRecovery);
    if (gameRecovery) {
      setWinner(WINNER_OPTIONS.NONE);
      setTurn(gameRecovery.turn);
      setBoard(gameRecovery.board);
      console.log("Loading recovery");
    } else {
      setWinner(WINNER_OPTIONS.NONE);
      setTurn(getInitialTurn());
      setBoard(Array(9).fill(null));
      console.log("Loading new game");
    }
  };

  const setEmptyBoard = () => {
    setWinner(WINNER_OPTIONS.NONE);
    setTurn(null);
    setBoard(Array(9).fill(null));
  };

  useEffect(() => {
    const newWinner = checkHasWinner(board);

    if (newWinner) {
      setWinner(newWinner);
    } else if (checkHasEnded(board)) {
      setWinner(WINNER_OPTIONS.TIE);
    }
  }, [board]);

  return { board, turn, winner, updateBoard, setNewBoard, setEmptyBoard };
};
