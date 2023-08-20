import Home from "./Component/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ResultPage from "./Component/ResultPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result-page" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
