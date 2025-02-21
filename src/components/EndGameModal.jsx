import { WINNER_OPTIONS } from "../logic/constants";
import { Modal } from "./Modal";

export const EndGameModal = ({ showModal, winner, handleNewGame }) => {
  if (!showModal) return null;

  const winnerText =
    winner === WINNER_OPTIONS.TIE ? "We have a tie" : `Congratulations to:`;

  return (
    <Modal title={winnerText}>
      <header className="winner">{winner}</header>
      <footer>
        <button onClick={handleNewGame}>New game</button>
      </footer>
    </Modal>
  );
};
