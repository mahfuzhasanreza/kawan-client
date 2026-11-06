import React, { useState, useRef, useEffect } from 'react';
import './EbookAudioBook.css';

const EbookAudioBook = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1); // Volume control (1 is max volume)
    const [isMuted, setIsMuted] = useState(false); // Mute control
    const audioRef = useRef(null);


    const audioSrc = '/public/assets/chap2.mp3'; // Replace with your audio file

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

    // Skip forward or backward by 10 seconds
    const skip = (seconds) => {
        audioRef.current.currentTime += seconds;
    };

    // Handle volume change
    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    };

    // Mute/unmute functionality
    const toggleMute = () => {
        setIsMuted(!isMuted);
        audioRef.current.muted = !isMuted;
    };

    // Handle user click on the progress bar to seek
    const handleProgressBarClick = (e) => {
        const progressBar = e.target;
        const clickPosition = e.nativeEvent.offsetX;
        const progressBarWidth = progressBar.offsetWidth;
        const newTime = (clickPosition / progressBarWidth) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    return (
        <div className="rounded-xl shadow-md mx-auto">

            {/* Audio Book Section */}
            <div className="audio-book-player bg-opacity-95 bg-purple-100 p-4 rounded-md shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Listen Book</h2>
                <audio
                    ref={audioRef}
                    src={audioSrc}
                    onTimeUpdate={handleTimeUpdate}
                    volume={volume}
                />
                <div className="flex items-center gap-2">
                    <button
                        onClick={togglePlayPause}
                        className="bg-purple-500 text-white px-4 py-2 rounded-md"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>

                    {/* Skip Backward */}
                    <button
                        onClick={() => skip(-10)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-md"
                    >
                        -10s
                    </button>

                    {/* Skip Forward */}
                    <button
                        onClick={() => skip(10)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-md"
                    >
                        +10s
                    </button>

                    {/* Mute/Unmute */}
                    <button
                        onClick={toggleMute}
                        className="bg-purple-500 text-white px-4 py-2 rounded-md"
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>


                    {/* Progress Bar */}
                    <div className="w-3/4">
                        <div
                            className="progress-bar bg-gray-300 w-full h-2 rounded-md overflow-hidden mx-4 cursor-pointer"
                            onClick={handleProgressBarClick} // Add onClick event for progress bar
                        >
                            <div
                                className="progress bg-purple-500 h-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Volume Control */}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="ml-10 mr-5 w-36"
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default EbookAudioBook;
