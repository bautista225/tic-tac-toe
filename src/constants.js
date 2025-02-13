import { generateWinPatterns } from "./logic/utils";

export const TURNS = {
  X: "×",
  O: "o",
};

export const WINNER_OPTIONS = {
  X: TURNS.X,
  O: TURNS.O,
  TIE: "-",
  NONE: null,
};

export const WINNING_COMBINATIONS = generateWinPatterns(3);
