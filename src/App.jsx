import { TicTacToeBoard } from "./components/TicTacToeBoard";
import "./App.css";
import { FooterBar } from "./components/FooterBar";

function App() {
  return (
    <div className="app">
      <TicTacToeBoard />
      <FooterBar />
    </div>
  );
}

export default App;
