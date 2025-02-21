import { useEffect } from "react";
import { useState } from "react";
import { getHistoricalStats } from "../services/GameService";

export const useGameStats = (gameName) => {
  const [stats, setStats] = useState();

  const refreshStats = () => {
    const historicalStats = getHistoricalStats(gameName);
    console.log({ historicalStats });
    if (historicalStats) setStats(historicalStats);
  };

  useEffect(() => {
    refreshStats();
  }, []);

  return { stats, refreshStats };
};
