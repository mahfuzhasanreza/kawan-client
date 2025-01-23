import { useEffect } from "react";

export default function Timer({ time, setTime, timerActive }) {
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerActive]);

  // Format time to hh:mm:ss
  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <p className="text-4xl w-full text-center font-bold">
      Time: <span className="text-red-300">{formatTime(time)}</span>
    </p>
  );
}
