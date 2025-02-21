import { GAME_NAME, TURNS, WINNER_OPTIONS } from "../logic/constants";
import { useTicTacToe } from "../hooks/useTicTacToe";
import { Cell } from "./Cell";
import { EndGameModal } from "./EndGameModal";
import { Turn } from "./Turn";
import "./TicTacToeBoard.css";
import { GameModeModal } from "./GameModeModal";
import { Stats } from "./Stats";
import { useGameStats } from "../hooks/useGameStats";

export const TicTacToeBoard = () => {
  const {
    board,
    turn,
    winner,
    player1,
    player2,
    newUserMove,
    startGame,
    repeatGame,
    resetGame,
  } = useTicTacToe();

  const { gameData, refreshStats } = useGameStats(GAME_NAME.TIC_TAC_TOE);

  const resetGamePlayers = () => {
    resetGame();
    refreshStats();
  };

  const repeatGamePlayers = () => {
    repeatGame();
    refreshStats();
  };

  return (
    <>
      <main className="board">
        <h1>Tic tac toe</h1>

        <section className="turn">
          <p className="player-name">{player1}</p>
          <Turn isSelected={turn === TURNS.X}>{TURNS.X}</Turn>
          <Turn isSelected={turn === TURNS.O}>{TURNS.O}</Turn>
          <p className="player-name">{player2}</p>
        </section>

        <section className="game">
          {board.map((_, index) => (
            <Cell key={index} index={index} updateBoard={newUserMove}>
              {board[index]}
            </Cell>
          ))}
        </section>

        <button onClick={resetGamePlayers}>Reset game</button>

        <GameModeModal showModal={player1 === null} startGame={startGame} />
        <EndGameModal
          showModal={winner !== WINNER_OPTIONS.NONE}
          winner={winner}
          handleNewGame={repeatGamePlayers}
        />
      </main>

      <Stats gameData={gameData} />
    </>
  );
};
