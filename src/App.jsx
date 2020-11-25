import { useMemo, useState } from 'react'
import { Nav } from './components/Nav'
import { Library } from './components/Library'
import { Song } from './components/Song'
import { Player } from './components/Player'
import { generateSongs } from './utils/generateSongs'

import './styles/app.scss'

function App() {
    const [songs] = useState(generateSongs())
    const [currentSongId, setCurrentSongId] = useState(songs[0].id)
    const [status, setStatus] = useState('PAUSED')
    const [isLibraryOpen, setIsLibraryOpen] = useState(false)

    // Gets the current song using the currentSongId
    const currentSong = useMemo(
        () => songs.find((s) => s.id === currentSongId),
        [songs, currentSongId]
    )

    return (
        <div className="app">
            <Nav
                isLibraryOpen={isLibraryOpen}
                setIsLibraryOpen={setIsLibraryOpen}
            />
            <main className={`${isLibraryOpen ? 'squeezed' : ''}`}>
                <Song song={currentSong} status={status} />
                <Player
                    songs={songs}
                    currentSong={currentSong}
                    setCurrentSongId={setCurrentSongId}
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
