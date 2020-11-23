import { LibrarySong } from './LibrarySong'

export const Library = ({ songs, currentSongId, setCurrentSongId }) => {
    return (
        <div className="library">
            <h2>Library</h2>
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
