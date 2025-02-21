import { AI_PLAYER_NAME } from "../logic/constants";
import { Modal } from "./Modal";

export const GameModeModal = ({ showModal, startGame }) => {
  if (!showModal) return null;

  const handlePlayers = (event) => {
    event.preventDefault();

    const inputs = new window.FormData(event.target);
    const player1 = inputs.get("Player1");
    const player2 = inputs.get("Player2");

    startGame({ player1, player2: player2 || AI_PLAYER_NAME });
  };

  return (
    <Modal title="Insert player names">
      <span>
        <em>Leave Player 2 empty for single mode</em>
      </span>
      <form className="gameModeForm" onSubmit={handlePlayers}>
        <input name="Player1" placeholder="Player 1" />
        <input name="Player2" placeholder="Player 2 (or empty)" />
        <button type="submit">Start</button>
      </form>
    </Modal>
  );
};
