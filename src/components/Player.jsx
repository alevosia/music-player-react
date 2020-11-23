import { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'
import { formatTime } from '../utils/formatTime'

export const Player = ({
    currentSong,
    status,
    setStatus,
    previousSong,
    nextSong,
}) => {
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })

    const audioRef = useRef(null)

    // Toggles the status between PAUSED and PLAYING
    // and plays/pauses the audio
    function toggleSong() {
        if (audioRef.current) {
            if (status === 'PAUSED') {
                audioRef.current.play()
                setStatus('PLAYING')
            } else {
                audioRef.current.pause()
                setStatus('PAUSED')
            }
        }
    }

    function seek(event) {
        const { value } = event.target

        if (audioRef.current) {
            audioRef.current.currentTime = value
        }
    }

    // Update the state whenever currentTime changes
    function handleTimeUpdate(event) {
        const { currentTime, duration } = event.target

        setSongInfo({
            currentTime: currentTime || 0,
            duration: duration || 0,
        })
    }

    // Whenever the current song changes and the status is playing
    // automatically play the new song
    useEffect(() => {
        if (status === 'PLAYING' && audioRef.current.paused) {
            audioRef.current.play()
        }
    }, [status, currentSong])

    return (
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <input
                    type="range"
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={seek}
                />
                <p>{formatTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FaStepBackward onClick={previousSong} />
                {status === 'PAUSED' ? (
                    <FaPlay onClick={toggleSong} />
                ) : (
                    <FaPause onClick={toggleSong} />
                )}
                <FaStepForward onClick={nextSong} />
            </div>
            <audio
                ref={audioRef}
                src={currentSong.audio}
                onEnded={nextSong}
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={handleTimeUpdate}
                preload="true"
            />
        </div>
    )
}
