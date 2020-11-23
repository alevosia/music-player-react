export const LibrarySong = ({ song, playing, setCurrentSongId }) => {
    function selectSong() {
        setCurrentSongId(song.id)
    }

    return (
        <div
            className={`library-song ${playing && 'playing'}`}
            onClick={selectSong}
        >
            <div className="song-cover">
                <img src={song.cover} alt={song.name} />
            </div>
            <div className="song-description">
                <h3 className="song-name">{song.name}</h3>
                <h4 className="song-artist">{song.artist}</h4>
            </div>
        </div>
    )
}
