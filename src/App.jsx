import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [moleIndex, setMoleIndex] = useState(null);
  const [piranhaIndex, setPiranhaIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const holes = Array.from({ length: 12 }, (_, index) => index);

  const showMoleAndPiranha = () => {
    const randomMoleIndex = Math.floor(Math.random() * holes.length);

    let randomPiranhaIndex;
    do {
      randomPiranhaIndex = Math.floor(Math.random() * holes.length);
    } while (randomPiranhaIndex === randomMoleIndex);

    setMoleIndex(randomMoleIndex);
    setPiranhaIndex(randomPiranhaIndex);
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsDisabled(true);
    setMoleIndex(null);
    setPiranhaIndex(null);
    showMoleAndPiranha();

    const newIntervalId = setInterval(() => {
      showMoleAndPiranha();
    }, 1000);

    setIntervalId(newIntervalId);

    setTimeout(() => {
      setGameOver(true);
      setIsDisabled(false);
      clearInterval(newIntervalId);
      setMoleIndex(null);
      setPiranhaIndex(null);
    }, 10000);
  };

  useEffect(() => {
    if (gameOver) {
      clearInterval(intervalId);
    }
  }, [gameOver, intervalId]);

  const hitMole = (index) => {
    if (moleIndex === index) {
      setScore((prevScore) => prevScore + 10);
      setMoleIndex(null);
      showMoleAndPiranha();
    }
  };

  const hitPiranha = (index) => {
    if (score > 0) {
      if (piranhaIndex === index) {
        setScore((prevScore) => prevScore - 10);
        setPiranhaIndex(null);
        showMoleAndPiranha();
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[url('/mario-bg.jpg')] bg-cover bg-center">
      <p className="text-3xl mb-4 font-semibold">Whack a Mole</p>
      <h1 className="text-3xl mb-4 font-semibold">Score: {score}</h1>
      <div className="w-full  md:w-2/3 xl:w-2/5 h-3/4 bg-[url('/soil.png')] bg-cover bg-center grid-cols-3 py-5 p-10 grid gap-4 justify-center items-center rounded-3xl border-white-600 border-4">
        {holes.map((_, index) => (
          <div
            key={index}
            className="bg-[url('/pipe.png')] bg-cover bg-center relative w-full h-full rounded-full cursor-pointer flex justify-center items-center"
            onClick={() => {
              if (moleIndex === index) {
                hitMole(index);
              } else if (piranhaIndex === index) {
                hitPiranha(index);
              }
            }}
          >
            {moleIndex === index && (
              <img
                src="/monty-mole.png"
                alt="Mole"
                className="absolute top-0 left-18 w-16 h-16"
              />
            )}
            {piranhaIndex === index && (
              <img
                src="/piranha-plant.png"
                alt="Piranha"
                className="absolute top-0 left-18 w-16 h-16"
              />
            )}
          </div>
        ))}
      </div>
      <button
        disabled={isDisabled}
        className={`${
          isDisabled ? "bg-black" : "bg-blue-500"
        } mt-4 px-4 py-2  text-white rounded`}
        onClick={startGame}
      >
        Start Game
      </button>
      {gameOver && (
        <p className="mt-4 text-red-500 font-semibold text-2xl">
          Game Over! Final Score: {score}
        </p>
      )}
    </div>
  );
}

export default App;
