import { useMemo, useState } from 'react'
import { Library } from './components/Library'
import { Nav } from './components/Nav'
import { Player } from './components/Player'
import { Song } from './components/Song'
import './styles/app.scss'
import { generateSongs } from './utils/generateSongs'

function App() {
    const [songs] = useState(generateSongs())
    const [currentSongId, setCurrentSongId] = useState(songs[0].id)
    const [status, setStatus] = useState('PAUSED')
    const [isLibraryOpen, setIsLibraryOpen] = useState(false)

    const currentSong = useMemo(
        () => songs.find((s) => s.id === currentSongId),
        [songs, currentSongId]
    )

    // Set the currentSongId to the id of the song previous of the current song
    function previousSong() {
        const currentSongIndex = songs.findIndex((s) => s.id === currentSongId)

        if (currentSongIndex !== 0) {
            setCurrentSongId(songs[currentSongIndex - 1].id)
        } else {
            setCurrentSongId(songs[songs.length - 1].id)
        }
    }

    // Set the currentSongId to the id of the song next of the current song
    function nextSong() {
        const currentSongIndex = songs.findIndex((s) => s.id === currentSongId)

        if (currentSongIndex < songs.length - 1) {
            setCurrentSongId(songs[currentSongIndex + 1].id)
        } else {
            setCurrentSongId(songs[0].id)
        }
    }

    return (
        <div className="app">
            <Nav
                isLibraryOpen={isLibraryOpen}
                setIsLibraryOpen={setIsLibraryOpen}
            />
            <main className={`${isLibraryOpen ? 'squeezed' : ''}`}>
                <Song song={currentSong} status={status} />
                <Player
                    currentSong={currentSong}
                    previousSong={previousSong}
                    nextSong={nextSong}
                    status={status}
                    setStatus={setStatus}
                />
            </main>
            <Library
                songs={songs}
                currentSongId={currentSongId}
                setCurrentSongId={setCurrentSongId}
                isLibraryOpen={isLibraryOpen}
            />
        </div>
    )
}

export default App
