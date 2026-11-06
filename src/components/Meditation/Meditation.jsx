

import { useState, useEffect, useContext } from "react";
import breathingLottieData from "../../assets/lottie/breathing.json";
import Lottie from "lottie-react";
import backgroundAnimation from "../../assets/lottie/meditationBg.json";
import { AuthContext } from "../../providers/AuthProvider";

const Meditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // Default: 5 minutes in seconds
  const [customMinutes, setCustomMinutes] = useState(5); // Default: 5 minutes
  const [customSeconds, setCustomSeconds] = useState(0); // Default: 0 seconds
  const alarmSound = new Audio("../../../public/assets/alarm-voice.mp3"); // Replace with your alarm sound path
  const {userType, userDb} = useContext(AuthContext);

  console.log(userType, "UserType");

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alarmSound.play(); // Play the alarm when time runs out
      setIsPlaying(false); // Stop the timer
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

  const handleSetTime = () => {
    const seconds = customMinutes * 60 + customSeconds; // Convert minutes and seconds to total seconds
    setTimeLeft(seconds);
  };

  return (
    <div className="min-h-screen flex justify-between bg-gradient-to-br from-black to-purple-700 text-white">
      <div className="w-3/5 flex flex-col justify-center content-center items-center">
        <div>
          <h1 className="text-4xl font-bold mb-5 text-center">
            Breathe & Relax
          </h1>
          <p className="text-lg text-center mb-10 max-w-xl">
            Embark on a calming journey. Focus on your breath, let go of stress, and
            rejuvenate your mind with a guided meditation session.
          </p>
          <div className="flex flex-col content-center items-center justify-center">
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


            {
              isPlaying ? (
                <div className="mt-10 w-1/3">
                  <Lottie animationData={breathingLottieData}></Lottie>
                </div>
              ) :
                (
                  <div className="mt-6 flex flex-col items-center">
                    <label className="mb-2 text-sm text-gray-200">
                      Set Timer (Minutes & Seconds):
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(Number(e.target.value))}
                        className="p-2 rounded-lg text-gray-800 text-center w-20"
                        placeholder="Minutes"
                      />
                      <input
                        type="number"
                        value={customSeconds}
                        onChange={(e) => setCustomSeconds(Number(e.target.value))}
                        className="p-2 rounded-lg text-gray-800 text-center w-20"
                        placeholder="Seconds"
                      />
                      <button
                        onClick={handleSetTime}
                        className="btn px-4 py-2 rounded-lg text-lg font-bold bg-purple-500 hover:bg-purple-600 text-white shadow-md transition-all duration-300"
                      >
                        Set Time
                      </button>
                    </div>
                  </div>
                )
            }


            <div className="mt-10">
              <p className="text-sm text-gray-200 max-w-md text-center">
                Remember, even a short moment of mindfulness can significantly improve
                your day. 🌿
              </p>
            </div>
          </div>
        </div>
      </div >

      <div className="w-2/5 items-center justify-center content-center">
        <div className="">
          <Lottie animationData={backgroundAnimation}></Lottie>
        </div>
      </div>
    </div >
  );
};

export default Meditation;
