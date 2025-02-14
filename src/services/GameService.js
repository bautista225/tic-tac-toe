export const saveGame = (game, gameMode, lastGameBoard, lastTurn) => {
  window.localStorage.setItem(
    `${game}_${gameMode}`,
    JSON.stringify({ lastGameBoard, lastTurn })
  );
};

export const recoverGame = (game, gameMode) => {
  const json = window.localStorage.getItem(`${game}_${gameMode}`);
  if (json) return JSON.parse(json);
  else return null;
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
  const json = window.localStorage.getItem(`${game}_${gameMode}`);
  if (json) return JSON.parse(json);
  else return null;
};
