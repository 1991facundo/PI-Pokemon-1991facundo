//HOOKS
import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//DEPENDENCIES
import axios from "axios";

//STYLES
import "./App.css"

//COMPONENTS
import LandingPage from "../src/views/landingPage/LandingPage";

function App() {

  return (
    <div className="App">
     

      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
