import { TURNS, WINNING_COMBINATIONS } from "./constants";

const getFirstTurn = () => {
  return Object.values(TURNS)[Math.floor(Math.random() * 2)];
};

export const getInitialMove = () => ({
  board: Array(9).fill(null),
  turn: getFirstTurn(),
});

export const checkHasWinner = (board) => {
  let player = null;
  const winner = WINNING_COMBINATIONS.some((pattern) => {
    player = board[pattern[0]] ?? false;
    return pattern.every((cellIndex) => board[cellIndex] === player);
  });

  return winner ? player : null;
};

export const checkHasEnded = (board) => board.every((cell) => cell !== null);
