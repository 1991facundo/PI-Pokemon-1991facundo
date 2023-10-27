//HOOKS
import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//DEPENDENCIES
import axios from "axios";

//STYLES
import "./App.css"

//COMPONENTS
import LandingPage from "./components/landingPage/landingPage";

function App() {

  return (
    <div className="App">
      {/* <h1>Henry Pokemon</h1> */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
