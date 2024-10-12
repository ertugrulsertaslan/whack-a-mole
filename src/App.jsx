import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [moleIndex, setMoleIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const holes = Array.from({ length: 15 }, (_, index) => index);

  const showMole = () => {
    const randomIndex = Math.floor(Math.random() * holes.length);
    setMoleIndex(randomIndex);
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsDisabled(true);
    setMoleIndex(null);
    showMole();

    const newIntervalId = setInterval(() => {
      showMole();
    }, 1000);
    setIntervalId(newIntervalId);

    setTimeout(() => {
      setGameOver(true);
      setIsDisabled(false);
      clearInterval(newIntervalId);
      setMoleIndex(null);
    }, 10000);
  };

  useEffect(() => {
    if (gameOver) {
      clearInterval(intervalId);
    }
  }, [gameOver, intervalId]);

  const hitMole = (index) => {
    if (moleIndex === index) {
      setScore((prevScore) => prevScore + 1);
      showMole();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <div className="container bg-white w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-4">Score: {score}</h1>
        <div className="w-full h-full md:w-1/2 md:h-4/5 bg-orange-600 p-16 grid grid-cols-3 gap-4 justify-center items-center">
          {holes.map((_, index) => (
            <div
              key={index}
              className="relative w-20 h-20 md:w-24 md:h-24 bg-green-500 rounded-full cursor-pointer"
              onClick={() => hitMole(index)}
            >
              {moleIndex === index && (
                <img
                  src="/photo.png"
                  alt="Mole"
                  className="absolute top-4 left-5 w-16 h-16"
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
          <p className="mt-4 text-red-500">Game Over! Final Score: {score}</p>
        )}
      </div>
    </div>
  );
}

export default App;
