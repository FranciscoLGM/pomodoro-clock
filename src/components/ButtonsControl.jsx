const ButtonsControl = ({ controlTime, resetTime, timerOn }) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-1">
      <button
        className="btn btn-success rounded-circle"
        onClick={controlTime}
        id="start_stop"
      >
        {timerOn ? (
          <i className="fa-solid fa-circle-play"></i>
        ) : (
          <i className="fa-solid fa-circle-pause"></i>
        )}
      </button>
      <button
        className="btn btn-secondary rounded-circle"
        onClick={resetTime}
        id="reset"
      >
        <i className="fa-solid fa-rotate"></i>
      </button>
    </div>
  );
};

export default ButtonsControl;
