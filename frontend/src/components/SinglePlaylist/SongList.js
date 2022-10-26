export default function SongList({ songs }) {

    return (
        <div className="flx-ctr flx-col plylst-page-songs">
            {songs.map(song => (
                <div className="plylst-song-slice" key={song.id}>
                    <img src={song.previewImage} alt={song.title} />
                    <span>{song.Artist.username} - </span>
                    <p>{song.title}</p>
                </div>
            ))}
        </div>
    )
}