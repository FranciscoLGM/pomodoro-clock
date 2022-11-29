import "./App.css";
import { useState, useEffect, useRef } from "react";
import breakTimeAudio from "./assets/audio/breakTime.wav";

//components
import Length from "./components/Length";
import ButtonsControl from "./components/ButtonsControl";
import DisplayTime from "./components/DisplayTime";
import Footer from "./components/Footer";

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(true);
  const [timerLabel, setTimerLabel] = useState("session");
  const breakAudio = useRef();

  useEffect(() => {
    if (displayTime === 0) {
      playBreakSound();
    }
  }, [displayTime]);

  useEffect(() => {
    if (!timerOn) {
      let interval = setInterval(() => {
        setDisplayTime((prev) => {
          if (prev === 0 && timerLabel === "session") {
            setTimerLabel("break");
            return breakTime;
          } else if (prev === 0 && timerLabel !== "session") {
            setTimerLabel("session");
            return sessionTime;
          }
          return prev - 1;
        });
      }, 1000);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }

    return () => clearInterval(localStorage.getItem("interval-id"));
  }, [breakTime, displayTime, timerLabel, sessionTime, timerOn]);

  const playBreakSound = () => {
    if (breakAudio.current !== null) {
      breakAudio.current.currentTime = 0;
      breakAudio.current.play();
    }
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      } else if (breakTime >= 60 * 60) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      } else if (sessionTime >= 60 * 60) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (timerOn) {
        setDisplayTime((prev) => prev + amount);
      }
    }
  };

  const controlTime = () => {
    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    clearInterval(localStorage.getItem("interval-id"));
    setTimerOn(true);
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerLabel("session");
    breakAudio.current.load();
  };

  return (
    <div className="App">
      <main className="bg-black">
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-light">
            <h1 className="p-2 fs-1 fw-semibold">Pomodoro Clock</h1>

            <div className="d-flex">
              <Length
                title={"Break Length"}
                changeTime={changeTime}
                type={"break"}
                time={breakTime}
              />

              <Length
                title={"Session Length"}
                changeTime={changeTime}
                type={"session"}
                time={sessionTime}
              />
            </div>

            <div>
              <DisplayTime timerLabel={timerLabel} displayTime={displayTime} />
            </div>

            <div>
              <ButtonsControl
                controlTime={controlTime}
                resetTime={resetTime}
                timerOn={timerOn}
              />
            </div>
            <Footer />
          </div>

          <audio
            id="beep"
            src={breakTimeAudio}
            type="audio"
            ref={breakAudio}
          ></audio>
        </div>
      </main>
    </div>
  );
}

export default App;
