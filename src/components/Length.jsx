const Length = ({ title, changeTime, type, time }) => {
  return (
    <main>
      <div>
        <h2 id={`${type}-label`} className="fs-2 p-4 pb-3">
          {title}
        </h2>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <button
            className="btn btn-primary"
            onClick={() => changeTime(-60, type)}
          >
            <i className="fa-solid fa-arrow-down" id={`${type}-decrement`}></i>
          </button>
          <h2 id={`${type}-length`}>{Math.floor(time / 60)}</h2>
          <button
            className="btn btn-primary"
            onClick={() => changeTime(60, type)}
          >
            <i className="fa-solid fa-arrow-up" id={`${type}-increment`}></i>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Length;
