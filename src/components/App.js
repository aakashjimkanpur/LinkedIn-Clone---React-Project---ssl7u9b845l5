import React from "react";
import "../styles/App.css";
import Mynavbar from "./Mynavbar";
import Home from "./home";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div id="main">
      <Toaster />
      <Mynavbar />
      <Home />
    </div>
  );
};

export default App;
