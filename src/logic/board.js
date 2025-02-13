import { WINNING_COMBINATIONS } from "../constants";

export const checkHasWinner = (board) => {
  let player = null;
  const winner = WINNING_COMBINATIONS.some((pattern) => {
    player = board[pattern[0]] ?? false;
    return pattern.every((cellIndex) => board[cellIndex] === player);
  });

  return winner ? player : null;
};
