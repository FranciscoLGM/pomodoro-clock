import "../App.css";
const DisplayTime = ({ timerLabel, displayTime }) => {
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div className="display-timer d-flex flex-column justify-content-center align-items-center p-5 m-4 rounded-circle border border-5 border-primary">
      <div id="timer-label">
        {timerLabel === "session" ? <h2>Session</h2> : <h2>Break</h2>}
      </div>
      <h1 id="time-left">{formatTime(displayTime)}</h1>
    </div>
  );
};

export default DisplayTime;
