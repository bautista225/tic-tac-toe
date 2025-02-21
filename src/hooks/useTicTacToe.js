import confetti from "canvas-confetti";
import { useState } from "react";
import {
  AI_PLAYER_NAME,
  GAME_MODES,
  GAME_NAME,
  TURNS,
  WINNER_OPTIONS,
} from "../logic/constants";
import { getAIPlayerMove } from "../logic/board";
import {
  recoverGame,
  removeGameRecovery,
  saveGameRecovery,
  saveNewGameData,
} from "../services/GameService";
import { useEffect } from "react";
import { useTicTacToeBoard } from "./useTicTacToeBoard";

export const useTicTacToe = () => {
  const [players, setPlayers] = useState({
    player1: null,
    player2: null,
  });
  const { player1, player2 } = players;
  const { board, turn, winner, updateBoard, setNewBoard, setEmptyBoard } =
    useTicTacToeBoard();
  console.log({ turn });
  const matchHasStarted = player1 !== null && turn !== null;
  const gameMode =
    player2 === AI_PLAYER_NAME
      ? GAME_MODES.SINGLE_PLAYER
      : GAME_MODES.MULTI_PLAYER;
  const isAIMove = turn === TURNS.O && gameMode === GAME_MODES.SINGLE_PLAYER;

  useEffect(() => {
    const availableRecovery = recoverGame(GAME_NAME.TIC_TAC_TOE);

    if (availableRecovery) {
      const { player1, player2 } = availableRecovery;
      setPlayers({ player1, player2 });
      setNewBoard(availableRecovery);
    } else {
      setPlayers({ player1: null, player2: null });
    }
  }, []);

  useEffect(() => {
    if (board.some((cell) => cell !== null))
      saveGameRecovery(GAME_NAME.TIC_TAC_TOE, {
        board,
        turn,
        player1,
        player2,
      });
  }, [turn, winner]);

  useEffect(() => {
    if (winner && winner !== WINNER_OPTIONS.TIE) {
      confetti();
      saveWinnerStats();
      removeGameRecovery(GAME_NAME.TIC_TAC_TOE);
    }
  }, [winner]);

  useEffect(() => {
    if (matchHasStarted && !winner && isAIMove) {
      console.log(`${AI_PLAYER_NAME} makes a movement`);
      const nextMovePosition = getAIPlayerMove(board);

      setTimeout(() => {
        updateBoard(nextMovePosition);
      }, 470);
    }
  }, [matchHasStarted, turn, winner, gameMode]);

  const saveWinnerStats = () => {
    const gameData = {
      player1,
      player2,
      winner,
      gameName: GAME_NAME.TIC_TAC_TOE,
      gameMode,
      dateTime: new Date(),
    };

    saveNewGameData(GAME_NAME.TIC_TAC_TOE, gameData);
    console.log("Match data saved!");
  };

  const repeatGame = () => {
    removeGameRecovery(GAME_NAME.TIC_TAC_TOE);
    setNewBoard();
  };

  const resetGame = () => {
    removeGameRecovery(GAME_NAME.TIC_TAC_TOE);
    setEmptyBoard();
    setPlayers({
      player1: null,
      player2: null,
    });
  };

  const startGame = ({ player1, player2 }) => {
    setNewBoard();
    setPlayers({ player1, player2 });
  };

  const newUserMove = (nextMovePosition) => {
    if (isAIMove) return;
    updateBoard(nextMovePosition);
  };

  return {
    board,
    turn,
    winner,
    player1,
    player2,
    newUserMove,
    startGame,
    repeatGame,
    resetGame,
  };
};
