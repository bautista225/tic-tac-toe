import { TURNS, WINNING_COMBINATIONS } from "./constants";

export const getRandomValueFromList = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

export const getInitialTurn = () =>
  getRandomValueFromList(Object.values(TURNS));

export const checkHasWinner = (board) => {
  let player = null;
  const winner = WINNING_COMBINATIONS.some((pattern) => {
    player = board[pattern[0]] ?? false;
    return pattern.every((cellIndex) => board[cellIndex] === player);
  });

  return winner ? player : null;
};

export const checkHasEnded = (board) => board.every((cell) => cell !== null);

export const getAIPlayerMove = (board) => {
  const pendingCellIndexes = board.reduce((notFilled, cell, index) => {
    if (!cell) notFilled.push(index);
    return notFilled;
  }, []);
  const newCellIndex = getRandomValueFromList(pendingCellIndexes);

  return newCellIndex;
};
