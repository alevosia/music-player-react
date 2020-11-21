import { useState } from 'react'
import { Player } from './components/Player'
import { Song } from './components/Song'
import './styles/app.scss'
import { generateSongs } from './utils/generateSongs'

function App() {
    const [songs] = useState(generateSongs())
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [status, setStatus] = useState('PAUSED')

    const currentSong = songs[currentSongIndex]

    function previousSong() {
        if (currentSongIndex !== 0) {
            setCurrentSongIndex((index) => index - 1)
        } else {
            setCurrentSongIndex(songs.length - 1)
        }
    }

    function nextSong() {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex((index) => index + 1)
        } else {
            setCurrentSongIndex(0)
        }
    }

    return (
        <div className="app">
            <Song song={currentSong} status={status} />
            <Player
                currentSong={currentSong}
                status={status}
                setStatus={setStatus}
                previousSong={previousSong}
                nextSong={nextSong}
            />
        </div>
    )
}

export default App
