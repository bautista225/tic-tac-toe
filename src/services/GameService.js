export const saveGame = (game, gameMode, lastGameBoard, lastTurn) => {
  window.localStorage.setItem(
    `${game}_${gameMode}`,
    JSON.stringify({ lastGameBoard, lastTurn })
  );
};

export const recoverGame = (game, gameMode) => {
  window.localStorage.getItem(`${game}_${gameMode}`);
};

export const resetGame = (game, gameMode) => {
  window.localStorage.removeItem(`${game}_${gameMode}`);
};

export const saveStats = (game, gameMode, historicalStats) => {
  window.localStorage.setItem(
    `${game}_${gameMode}`,
    JSON.stringify({ historicalStats })
  );
};

export const getStats = (game, gameMode) => {
  window.localStorage.setItem(`${game}_${gameMode}`);
};
