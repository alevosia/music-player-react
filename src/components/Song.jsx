export const Song = ({ song, status }) => {
    return (
        <div className="song-container">
            <div className="song-cover">
                <img
                    src={song?.cover}
                    alt={song?.name}
                    className={status === 'PLAYING' ? 'spinning' : ''}
                />
            </div>
            <h1 className="song-name">{song?.name}</h1>
            <h3 className="song-artist">{song?.artist}</h3>
        </div>
    )
}
