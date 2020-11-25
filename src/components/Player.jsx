import { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'
import { formatTime } from '../utils/formatTime'

export const Player = ({
    songs,
    currentSong,
    setCurrentSongId,
    status,
    setStatus,
}) => {
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })

    const audioRef = useRef(null)

    // Toggles the status between PAUSED and PLAYING
    // and plays/pauses the audio
    function toggleStatus() {
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

    // Moves the currentTime whenever the slider is dragged
    function seek(event) {
        const { value } = event.target

        if (audioRef.current) {
            audioRef.current.currentTime = value
        }
    }

    // Update the state whenever currentTime changes
    function updateSongInfo(event) {
        const { currentTime, duration } = event.target

        setSongInfo({
            currentTime: currentTime || 0,
            duration: duration || 0,
        })
    }

    // Set the currentSongId to the id of the song previous of the current song
    function previousSong() {
        const currentSongIndex = songs.findIndex((s) => s.id === currentSong.id)

        if (currentSongIndex !== 0) {
            setCurrentSongId(songs[currentSongIndex - 1].id)
        } else {
            setCurrentSongId(songs[songs.length - 1].id)
        }
    }

    // Set the currentSongId to the id of the song next of the current song
    function nextSong() {
        const currentSongIndex = songs.findIndex((s) => s.id === currentSong.id)

        if (currentSongIndex < songs.length - 1) {
            setCurrentSongId(songs[currentSongIndex + 1].id)
        } else {
            setCurrentSongId(songs[0].id)
        }
    }

    // Whenever the current song changes
    // and the status is playing, automatically play the new song
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
                    <FaPlay onClick={toggleStatus} />
                ) : (
                    <FaPause onClick={toggleStatus} />
                )}
                <FaStepForward onClick={nextSong} />
            </div>
            <audio
                ref={audioRef}
                src={currentSong?.audio}
                onEnded={nextSong}
                onTimeUpdate={updateSongInfo}
                onLoadedData={updateSongInfo}
                preload="true"
            />
        </div>
    )
}
