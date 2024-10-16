import React, { useEffect, useRef, useState } from "react";
import "./App.css";
const App = () => {
  const [time, setTime] = useState({ hour: "", minute: "", second: "" });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const handleChange = (e, type) => {
    const value = parseInt(e.target.value, 10) || 0;
    const cpyTime = { ...time };
    cpyTime[type] = value;
    cpyTime.minute += Math.floor(cpyTime.second / 60);
    cpyTime.second = cpyTime.second % 60;
    cpyTime.hour += Math.floor(cpyTime.minute / 60);
    cpyTime.minute = cpyTime.minute % 60;
    setTime(cpyTime);
    //console.log(cpyTime);
  };
  const handleStart = () => {
    setIsRunning(!isRunning);
  };
  useEffect(() => {
    if (isRunning) {
      if (
        time.hour.length === 0 &&
        time.minute.length === 0 &&
        time.second.length === 0
      ) {
        return;
      }
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const cpyPrevTime = { ...prevTime };
          cpyPrevTime.second--;
          if (cpyPrevTime.second < 0) {
            cpyPrevTime.minute--;
            cpyPrevTime.second = 59;
          }
          if (cpyPrevTime.minute < 0) {
            cpyPrevTime.hour--;
            cpyPrevTime.minute = 59;
          }
          if (cpyPrevTime.hour < 0) {
            return { hour: "", minute: "", second: "" };
          }
          return cpyPrevTime;
          //console.log(cpyPrevTime.second);
        });
      }, 1000);
      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [isRunning]);
  const handleReset = () => {
    //console.log("data cleared");
    setTime({ hour: "", minute: "", second: "" });
    setIsRunning(false);
    //console.log(isRunning);
  };
  return (
    <div className="CountDown-content">
      <div className="input">
        <input
          type="text"
          placeholder="Hour"
          name=""
          id=""
          onChange={(e) => handleChange(e, "hour")}
          value={time.hour}
        />
        {":"}
        <input
          type="text"
          placeholder="Minute"
          name=""
          id=""
          onChange={(e) => handleChange(e, "minute")}
          value={time.minute}
        />
        {":"}
        <input
          type="text"
          placeholder="Second"
          name=""
          id=""
          onChange={(e) => handleChange(e, "second")}
          value={time.second}
        />
      </div>
      <div className="buttons">
        <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
