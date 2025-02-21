import { useGameStats } from "../hooks/useGameStats";

export const Stats = ({ gameData }) => {
  if (!gameData) return <p>Your matches will be displayed here</p>;
  const { historicalStats } = gameData;

  const results = historicalStats.reduce(
    (acc, { player1name, player2name, winnerName, dateTime }) => {
      const [p1, p2] = [player1name, player2name];
      const key = `${p1}-${p2}`;

      if (!acc[key]) {
        acc[key] = { p1, p2, [p1]: 0, [p2]: 0, latestDate: dateTime };
      }

      acc[key][winnerName]++;
      return acc;
    },
    {}
  );

  const sortedResults = Object.values(results).sort(
    (a, b) => new Date(b.latestDate) - new Date(a.latestDate)
  );

  return (
    <section style={{ textAlign: "center" }}>
      <h2>Leaderboard</h2>
      {sortedResults.map(({ p1, p2, [p1]: score1, [p2]: score2 }) => (
        <div
          key={`${p1}-${p2}`}
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p style={{ width: "50px" }}>{`${p1}`}</p>
          <p style={{ width: "50px" }}>{`${score1}-${score2}`}</p>
          <p style={{ width: "50px" }}>{`${p2}`}</p>
        </div>
      ))}
    </section>
  );
};
