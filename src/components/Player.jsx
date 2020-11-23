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
        currentTime: null,
        duration: null,
    })

    const audioRef = useRef(null)
    const rangeRef = useRef(null)

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

    // Update the state whenever currentTime changes
    function handleTimeUpdate(event) {
        const { currentTime, duration } = event.target

        setSongInfo({
            currentTime,
            duration,
        })
    }

    // Whenever the songInfo changes, update the range slider
    useEffect(() => {
        if (rangeRef.current) {
            rangeRef.current.value =
                (songInfo.currentTime / songInfo.duration) * 100
        }
    }, [songInfo])

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
                    min="0"
                    max="100"
                    defaultValue="0"
                    ref={rangeRef}
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
            />
        </div>
    )
}
