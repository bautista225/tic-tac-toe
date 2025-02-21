export const saveGameRecovery = (game, gameMoveInfo) => {
  window.localStorage.setItem(
    `${game}_last_move`,
    JSON.stringify(gameMoveInfo)
  );
};

export const recoverGame = (game) => {
  const json = window.localStorage.getItem(`${game}_last_move`);
  if (json) return JSON.parse(json);
  else return null;
};

export const removeGameRecovery = (game) => {
  window.localStorage.removeItem(`${game}_last_move`);
};

export const saveNewGameData = (game, newGameData) => {
  const gameData = getHistoricalStats(game) ?? { historicalStats: [] };
  gameData.historicalStats.push(newGameData);

  window.localStorage.setItem(`${game}_dataStats`, JSON.stringify(gameData));
};

export const getHistoricalStats = (game) => {
  const json = window.localStorage.getItem(`${game}_dataStats`);
  if (json) return JSON.parse(json);
  else return null;
};
