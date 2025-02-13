import "./App.css";

const TURNS = {
  X: "×",
  O: "o",
};

const board = Array(9).fill(null);

const Square = ({ children, updateBoard, index }) => (
  <div className="square">{children}</div>
);

function App() {
  return (
    <main className="board">
      <h1>Tic tac toe</h1>

      <section className="game">
        {board.map((_, index) => (
          <Square key={index} index={index}></Square>
        ))}
      </section>
    </main>
  );
}

export default App;
