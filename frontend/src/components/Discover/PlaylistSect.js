import PlaylistBox from "../Playlists/PlaylistBox"

export default function PlaylistSect({ playlists, sect, audioPlayer }) {

    return (
        <section className="song-sect">
            <h3>Charts: {sect}</h3>
            <div className="song-list">
                {!!playlists.length && playlists.map(playlist => (
                    <PlaylistBox key={playlist.id} playlist={playlist} audioPlayer={audioPlayer} />
                ))}
            </div>
        </section>
    )
}