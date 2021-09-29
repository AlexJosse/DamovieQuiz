import "./App.css";
import Game from "./components/game";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container maxWidth="sm" className="App">
      <Game></Game>
    </Container>
  );
}

export default App;
