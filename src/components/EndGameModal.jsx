import { WINNER_OPTIONS } from "../logic/constants";

export const EndGameModal = ({ winner, handleNewGame }) => {
  if (winner === WINNER_OPTIONS.NONE) return null;

  const winnerText =
    winner === WINNER_OPTIONS.TIE ? "We have a tie" : `Congratulations to:`;

  return (
    <section className="modal">
      <div className="content">
        <span className="title">{winnerText}</span>
        <header className="winner">{winner}</header>
        <footer>
          <button onClick={handleNewGame}>New game</button>
        </footer>
      </div>
    </section>
  );
};
