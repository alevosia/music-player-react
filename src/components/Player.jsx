import { useEffect, useRef } from 'react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'

export const Player = ({
    currentSong,
    status,
    setStatus,
    previousSong,
    nextSong,
}) => {
    const audioRef = useRef()
    const rangeRef = useRef()

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

    function updateRange(event) {
        if (rangeRef.current) {
            const { duration, currentTime } = event.target
            rangeRef.current.value = (currentTime / duration) * 100
        }
    }

    // Whenever the current song changes and the status is playing
    // automatically play the new song
    useEffect(() => {
        if (status === 'PLAYING' && audioRef.current.paused) {
            audioRef.current.play()
        }
    }, [status, currentSong])

    // Whenever the current song changes, set the range's value to zero
    useEffect(() => {
        if (rangeRef.current) {
            rangeRef.current.value = 0
        }
    }, [currentSong])

    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="0"
                    ref={rangeRef}
                />
                <p>End Time</p>
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
                onTimeUpdate={updateRange}
            />
        </div>
    )
}
