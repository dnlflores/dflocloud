import SongBox from './SongBox';

export default function Songs({ songs, audioPlayer }) {
    const songsArr = Object.values(songs || {})

    return (
        <div className="library-comp">
            {songs && songsArr.map(song => (
                <SongBox song={song} audioPlayer={audioPlayer} />
            ))}
        </div>
    )
}