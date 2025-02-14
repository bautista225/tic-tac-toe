import confetti from "canvas-confetti";
import { useState } from "react";
import {
  GAME_MODES,
  GAME_NAME,
  TURNS,
  WINNER_OPTIONS,
} from "../logic/constants";
import { checkHasEnded, checkHasWinner, getInitialMove } from "../logic/board";
import { recoverGame, resetGame, saveGame } from "../services/GameService";
import { useEffect } from "react";

export const useTicTacToe = () => {
  const [{ board, turn }, setMove] = useState(() => {
    const availableRecovery = recoverGame(
      GAME_NAME.TIC_TAC_TOE,
      GAME_MODES.MULTI_PLAYER
    );
    return availableRecovery
      ? {
          board: availableRecovery.lastGameBoard,
          turn: availableRecovery.lastTurn,
        }
      : getInitialMove();
  });

  const [winner, setWinner] = useState(WINNER_OPTIONS.NONE);

  useEffect(() => {
    if (board.some((cell) => cell !== null))
      saveGame(GAME_NAME.TIC_TAC_TOE, GAME_MODES.MULTI_PLAYER, board, turn);

    const newWinner = checkHasWinner(board);
    console.log({ newWinner });
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkHasEnded(board)) {
      setWinner(WINNER_OPTIONS.TIE);
    }
  }, [turn]);

  const updateBoard = (index) => {
    if (winner || board[index]) return;

    const updatedBoard = [...board];
    updatedBoard[index] = turn;
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;

    setMove({ board: updatedBoard, turn: newTurn });
  };

  const resetBoard = () => {
    setMove(getInitialMove());
    setWinner(WINNER_OPTIONS.NONE);
    resetGame(GAME_NAME.TIC_TAC_TOE, GAME_MODES.MULTI_PLAYER);
  };

  return { board, turn, winner, resetBoard, updateBoard };
};
