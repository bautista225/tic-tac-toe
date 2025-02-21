import { useEffect } from "react";
import { useState } from "react";
import { getGameData } from "../services/GameService";

export const useGameStats = (gameName) => {
  const [stats, setStats] = useState();

  const refreshStats = () => {
    const gameData = getGameData(gameName);
    console.log({ gameData });
    if (gameData) setStats(gameData.historicalStats);
  };

  useEffect(() => {
    refreshStats();
  }, []);

  return { stats, refreshStats };
};
