import { Stats } from "./components/Stats";
import { TicTacToeBoard } from "./components/TicTacToeBoard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <TicTacToeBoard />
      <Stats />
    </div>
  );
}

export default App;
