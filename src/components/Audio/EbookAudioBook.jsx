import React, { useState, useRef, useEffect } from 'react';
import './EbookAudioBook.css';

const EbookAudioBook = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // Sample text and audio
  const ebookText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Proin suscipit, nisl a aliquet pellentesque, felis elit cursus ligula, 
  in malesuada ligula nulla vel tortor.`;

  const audioSrc = '/public/assets/sample-audio.mp3'; // Replace with your audio file

  // Play/Pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <div className="ebook-audiobook-container bg-gray-100 p-5 rounded-md shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">E-Book & Audio Book Listener</h1>

      {/* E-Book Reader Section */}
      <div className="ebook-reader bg-white p-4 rounded-md shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-2">E-Book</h2>
        <p className="text-gray-700">{ebookText}</p>
      </div>

      {/* Audio Book Section */}
      <div className="audio-book-player bg-white p-4 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Audio Book</h2>
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
        />
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlayPause}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="progress-bar bg-gray-300 w-full h-2 rounded-md overflow-hidden mx-4">
            <div
              className="progress bg-blue-500 h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookAudioBook;
