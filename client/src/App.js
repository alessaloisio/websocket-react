import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";

import io from "socket.io-client";
const socket = io();
const getUpdateTime = cb => {
  socket.on("updateTime", time => cb(null, time));
};

const App = () => {
  const [Time, setTime] = useState(null);

  useEffect(() => {
    getUpdateTime((err, time) => {
      setTime(time);
    });
  }, [Time]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{Time}</p>
      </header>
    </div>
  );
};

export default App;
