import SongBox from "../Songs/SongBox";

export default function SongSect({ audioPlayer, songs, sect }) {

    return(
        <section className="song-sect">
            <h3>Charts: {sect}</h3>
            <div className="song-list">
                {!!songs.length && songs.map(song => (
                    <SongBox key={song.id} song={song} audioPlayer={audioPlayer} />
                ))}
            </div>
        </section>
    )
}