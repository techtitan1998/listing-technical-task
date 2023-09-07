import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./views/CharacterList";
import CharacterDetail from "./views/CharacterDetail";
import "./assets/css/style.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character-detail/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
