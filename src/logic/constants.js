import { generateWinPatterns } from "./utils";

export const GAME_NAME = {
  TIC_TAC_TOE: "TicTacToe",
};
export const GAME_MODES = {
  SINGLE_PLAYER: "SinglePlayer",
  MULTI_PLAYER: "MultiPlayer",
};

export const TURNS = {
  X: "✖",
  O: "○",
};

export const AI_PLAYER_NAME = "🤖";

export const WINNER_OPTIONS = {
  X: TURNS.X,
  O: TURNS.O,
  TIE: "-",
  NONE: null,
};

export const WINNING_COMBINATIONS = generateWinPatterns(3);
