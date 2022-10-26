import { useDispatch } from "react-redux";
import { songPlayed } from "../../store/songs";
import { useNowPlaying } from "../../context/NowPlayingContext"

export default function SongList({ songs, audioPlayer, setPlaylistStarted }) {
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying, setQueue } = useNowPlaying();

    const handleClick = (e, song, songIndex) => {
        e.stopPropagation();
        setQueue(songs.slice(songIndex + 1));
        setPlaylistStarted(true);
        if (nowPlaying.id !== song.id) {
            setNowPlaying(song);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    return (
        <div className="flx-ctr flx-col plylst-page-songs">
            {songs.map((song, idx) => (
                <div className="plylst-song-slice" key={song.id} onClick={e => handleClick(e, song, idx)}>
                    <img src={song.previewImage} alt={song.title} />
                    <span>{song.Artist.username} - </span>
                    <p>{song.title}</p>
                </div>
            ))}
        </div>
    )
}