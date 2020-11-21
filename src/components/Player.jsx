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

    useEffect(() => {
        if (status === 'PLAYING' && audioRef.current.paused) {
            audioRef.current.play()
        }
    }, [status, currentSong])

    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
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
            <audio ref={audioRef} src={currentSong.audio} />
        </div>
    )
}
