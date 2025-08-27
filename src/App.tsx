import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PNRChecker from "./components/PNRChecker";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PNRChecker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
