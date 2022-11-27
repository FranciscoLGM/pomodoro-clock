const Length = ({ title, changeTime, type, time, formatTime }) => {
  return (
    <main>
      <div>
        <h2>{title}</h2>
        <div className="d-flex">
          <button
            className="btn btn-outline-secondary"
            onClick={() => changeTime(-60, type)}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
          <h2>{formatTime(time)}</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => changeTime(60, type)}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Length;
