import { LibrarySong } from './LibrarySong'

export const Library = ({
    songs,
    currentSongId,
    setCurrentSongId,
    isLibraryOpen,
}) => {
    return (
        <div className={`library ${isLibraryOpen ? 'open' : ''}`}>
            <div className="library-songs">
                {songs && songs.length > 0
                    ? songs.map((song) => (
                          <LibrarySong
                              key={song.id}
                              song={song}
                              isCurrent={song.id === currentSongId}
                              setCurrentSongId={setCurrentSongId}
                          />
                      ))
                    : null}
            </div>
        </div>
    )
}
