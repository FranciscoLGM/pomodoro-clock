import "./App.css";
import { useState } from "react";
import breakTimeAudio from "./assets/audio/breakTime.wav";

//components

import Length from "./components/Length";

function App() {
  const [displayTime, setDisplayTime] = useState(10);
  const [breakTime, setBreakTime] = useState(3);
  const [sessionTime, setSessionTime] = useState(10);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(new Audio(breakTimeAudio));

  console.log(onBreak);

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type == "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              playBreakSound();
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              playBreakSound();
              onBreakVariable = false;
              setOnBreak(false);
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };

  return (
    <div className="App">
      <main>
        <div className="container">
          <h1>25 + 5 Clock</h1>

          <Length
            title={"Break Length"}
            changeTime={changeTime}
            type={"break"}
            time={breakTime}
            formatTime={formatTime}
          />

          <Length
            title={"Session Length"}
            changeTime={changeTime}
            type={"Session"}
            time={sessionTime}
            formatTime={formatTime}
          />

          <h2>{onBreak ? "Break" : "Session"}</h2>
          <h1>{formatTime(displayTime)}</h1>
          <button className="btn btn-outline-secondary" onClick={controlTime}>
            {timerOn ? (
              <i className="fa-solid fa-circle-pause"></i>
            ) : (
              <i className="fa-solid fa-circle-play"></i>
            )}
          </button>
          <button className="btn btn-outline-secondary" onClick={resetTime}>
            <i className="fa-solid fa-rotate"></i>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
