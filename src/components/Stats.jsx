import "./Stats.css";

const obtainSortedLeaderboard = (stats) => {
  const results = stats.reduce(
    (acc, { player1, player2, winner, dateTime }) => {
      const [p1, p2] = [player1, player2];
      const key = `${p1}-${p2}`;

      if (!acc[key]) {
        acc[key] = { p1, p2, [p1]: 0, [p2]: 0, latestDate: dateTime };
      }

      acc[key][winner]++;
      acc[key].latestDate =
        new Date(acc[key].latestDate) - new Date(dateTime) > 0
          ? acc[key].latestDate
          : dateTime;
      return acc;
    },
    {}
  );

  const sortedResults = Object.values(results).sort(
    (a, b) => new Date(b.latestDate) - new Date(a.latestDate)
  );

  return sortedResults;
};

export const Stats = ({ historicalStats }) => {
  if (!historicalStats) return <p>Your matches will be displayed here</p>;

  const sortedResults = obtainSortedLeaderboard(historicalStats);

  return (
    <section className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leaderboard-list">
        {sortedResults.map(({ p1, p2, [p1]: score1, [p2]: score2 }) => (
          <div key={`${p1}-${p2}`} className="match-row">
            <div className="leaderboard-player player-left">{p1}</div>
            <span className="score-badge">{`${score1} | ${score2}`}</span>
            <div className="leaderboard-player player-right">{p2}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
