import { useState, useEffect } from "react";
import breathingLottieData from "../../assets/lottie/breathing.json";
import Lottie from "lottie-react";
import backgroundAnimation from "../../assets/lottie/meditationBg.json";

const Meditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // Default: 5 minutes in seconds

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="pb-20 min-h-screen flex justify-between  bg-gradient-to-br from-black to-purple-700 text-white">
      <div className="w-3/5 flex flex-col justify-center content-center  items-center">
        <div className="w-1/3">
          <Lottie animationData={breathingLottieData}></Lottie>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-5 text-center">
            Breathe & Relax
          </h1>
          <p className="text-lg text-center mb-10 max-w-xl">
            Embark on a calming journey. Focus on your breath, let go of stress, and
            rejuvenate your mind with a guided meditation session.
          </p>
          <div className="flex flex-col content-center  items-center justify-center">

            <div className="card w-96 bg-white text-gray-800 shadow-xl p-8 rounded-3xl flex flex-col items-center space-y-8">
              <div className="text-5xl font-extrabold text-purple-600">
                {formatTime(timeLeft)}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={togglePlay}
                  className={`btn px-6 py-3 rounded-full text-lg font-bold shadow-md ${isPlaying
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                    } transition-all duration-300`}
                >
                  {isPlaying ? "Pause" : "Start"}
                </button>
                <button
                  onClick={() => setTimeLeft(300)}
                  className="btn px-6 py-3 rounded-full text-lg font-bold bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-all duration-300"
                >
                  Reset
                </button>
              </div>
              {isPlaying ? (
                <p className="text-center text-sm text-gray-600 animate-pulse">
                  Focus on your breathing. Inhale... Exhale...
                </p>
              ) : (
                <p className="text-center text-sm text-gray-600">
                  Click Start to begin your session.
                </p>
              )}
            </div>
            <div className="mt-10">
              <p className="text-sm text-gray-200 max-w-md text-center">
                Remember, even a short moment of mindfulness can significantly improve
                your day. 🌿
              </p>
            </div>

          </div>
        </div>

      </div>

      <div className="w-2/5 items-center justify-center content-center">
        <div className="">
          <Lottie animationData={backgroundAnimation}></Lottie>
        </div>

      </div>
    </div>
  );
};

export default Meditation;
