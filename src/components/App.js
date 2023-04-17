import React, { useState } from "react";
import "../styles/App.css";
import Mynavbar from "./Mynavbar";
import Home from "./Home";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Login from "./Login";
import UserContext from "./userContext";
import Newuser from "./Newuser";

const App = () => {
  const [userName, setUserName] = useState("Login");
  return (
    <div id="main">
      <BrowserRouter>
        <UserContext.Provider
          value={{ name: { userName }, setname: { setUserName } }}
        >
          <Toaster />
          <Mynavbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/newuser" element={<Newuser />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
