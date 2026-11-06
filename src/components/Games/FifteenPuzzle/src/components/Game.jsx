
import { useEffect, useState } from "react";
import shuffleArray from "../utils/shuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";
import './Game.css';

export default function Game() {
  const [shuffledArray, setShuffledArray] = useState(shuffleArray());
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (moves === 1) setTimerActive(true);
    let won = true;
    for (let i = 0; i < shuffledArray.length - 1; i++) {
      const value = shuffledArray[i];
      if (i == value - 1) continue;
      else {
        won = false;
        break;
      }
    }
    if (won) {
      setWin(true);
      setTimerActive(false);
    }
    return;
  }, [moves]);

  const newGame = () => {
    setMoves(0);
    setTimerActive(false);
    setTime(0);
    setShuffledArray(shuffleArray());
    setWin(false);
  };

  const dragStart = (e) => e.dataTransfer.setData("tile", e.target.id);

  const dragOver = (e) => e.preventDefault();

  const dropped = (e) => {
    e.preventDefault();
    const tile = e.dataTransfer.getData("tile");
    const oldPlace = Number(document.getElementById(tile).parentElement.id.slice(6)) - 1;
    const newPlace = Number(e.target.id.slice(6)) - 1;

    if (!(Math.abs(oldPlace - newPlace) == 4 || Math.abs(oldPlace - newPlace) == 1)) return;

    const [i, j] = [Math.min(oldPlace, newPlace), Math.max(oldPlace, newPlace)];
    setShuffledArray([
      ...shuffledArray.slice(0, i),
      shuffledArray[j],
      ...shuffledArray.slice(i + 1, j),
      shuffledArray[i],
      ...shuffledArray.slice(j + 1),
    ]);
    setMoves(moves + 1);
  };

  return (
    <div className="px-3 lg:px-32 pb-32 pt-20 text-gray-300 bg-gray-950">
      <div className="mx-auto w-full text-center">
        <h1 className="text-3xl lg:text-4xl text-fuchsia-600 font-bold text-center">
          15 Puzzle Game
        </h1>
        <h3 className="mt-4 mb-10 text-xl font-bold 
      text-center bg-clip-text 
      text-transparent bg-gradient-to-r 
      from-indigo-500 from-10% via-sky-500 
      via-30% to-emerald-500 to-90% lg:w-2/3 mx-auto">
          Challenge your mind and unwind your thoughts with this calming puzzle game. A simple way to boost focus, relieve stress, and refresh your mental clarity—one move at a time.
        </h3>
      </div>

      <div className="mt-14  flex flex-col-reverse lg:flex-row justify-between">
        <div className="lg:flex w-fit  mx-auto lg:w-3/4">
          <div className="mx-auto mr-0">
            {win && (
              <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-2 mb-2">
                <div className="flex items-center justify-center space-x-4">
                  <p className="font-medium text-green-600">
                    HURRAY!! You have won the game
                  </p>
                </div>
              </div>
            )}

            <div className="w-fit">
              <div className="items-center justify-center text-center content-center flex">
                <Puzzle shuffledArray={shuffledArray}
                  dragStart={dragStart}
                  dragOver={dragOver} dropped={dropped} />
              </div>
              <div className="px-6 mt-7">
                <button
                  onClick={newGame}
                  className="text-black font-bold block 
          bg-gray-900 p-2 rounded w-full 
          h-full bg-gradient-to-r from-indigo-500 
          from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                >
                  Reset Puzzle
                </button>
              </div>
            </div>

          </div>
        </div>
        <div className="mb-8 lg:mb-0 flex justify-center items-center content-center text-center w-full">
          <div className="flex flex-col gap-5 justify-start text-start px-6 mt-2">
            {/* <p>Moves: {moves}</p> */}
            <Timer time={time} timerActive={timerActive} setTime={setTime} />
            <div className="outer z-0">
              <div className="dot"></div>
              <div className="card-game">
                <div className="ray"></div>
                <div className="text">{moves}</div>
                <div className="text-2xl mb-5 font-bold text-gray-300">Moves</div>
                <div className="line topl"></div>
                <div className="line leftl"></div>
                <div className="line bottoml"></div>
                <div className="line rightl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}
