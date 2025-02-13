import { TURNS, WINNING_COMBINATIONS } from "../constants";

export const getFirstTurn = () => {
  return Object.values(TURNS)[Math.floor(Math.random() * 2)];
};

export const generateWinPatterns = (size) => {
  const patterns = [];

  // Definning winnning rows
  for (let i = 0; i < size; i++) {
    patterns.push([...Array(size)].map((_, j) => i * size + j));
  }

  // Definning winnning columns
  for (let i = 0; i < size; i++) {
    patterns.push([...Array(size)].map((_, j) => j * size + i));
  }

  // Definning diagonal 1 (\)
  patterns.push([...Array(size)].map((_, i) => i * (size + 1)));

  // Definning diagonal 2 (/)
  patterns.push([...Array(size)].map((_, i) => (i + 1) * (size - 1)));

  return patterns;
};
