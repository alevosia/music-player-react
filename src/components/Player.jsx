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
                <FaStepBackward
                    onClick={previousSong}
                    className="skip-backward-button"
                    size="18px"
                />
                {status === 'PAUSED' ? (
                    <FaPlay
                        onClick={toggleSong}
                        className="toggle-song-button"
                    />
                ) : (
                    <FaPause
                        onClick={toggleSong}
                        className="toggle-song-button"
                    />
                )}
                <FaStepForward
                    onClick={nextSong}
                    className="skip-forward-button"
                    size="18px"
                />
            </div>
            <audio ref={audioRef} src={currentSong.audio} />
        </div>
    )
}
