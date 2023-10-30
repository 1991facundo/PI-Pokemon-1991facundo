//HOOKS
import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";


//DEPENDENCIES
import axios from "axios";

//STYLES
import "./App.css"

//COMPONENTS
import LandingPage from "../src/views/landingPage/LandingPage";
import HomePage from '../src/views/homePage/HomePage'
import DetailPage from "./views/detailPage/detail";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<DetailPage/>} />
      </Routes>
    </div>
  );
}

export default App;
