import { WINNER_OPTIONS } from "../constants";

export const EndGameModal = ({ winner, handleNewGame }) => {
  if (winner !== WINNER_OPTIONS.NONE) return null;

  const winnerText =
    winner === WINNER_OPTIONS.TIE ? "We have a tie" : `Congratulations to:`;

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">{winner}</header>
        <footer>
          <button onClick={handleNewGame}>New game</button>
        </footer>
      </div>
    </section>
  );
};
