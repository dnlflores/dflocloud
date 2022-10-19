import { useDispatch } from "react-redux";
import { useNowPlaying } from "../../context/NowPlayingContext";
import { songPlayed } from "../../store/songs";

export default function PlayerInfoSect({ song, audioPlayer }) {
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying, isPlaying } = useNowPlaying();

    const handleClick = (e) => {
        e.stopPropagation();
        if (nowPlaying.id !== song.id) {
            setNowPlaying(song);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    if (!song.Artist) return null;

    return (
        <div className="flx-ctr background-player-info">
            <div>
                <div className="flx-ctr play-song">
                    <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? nowPlaying.id === song.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
                    <div className="flx-ctr flx-col song-text">
                        <h2>{song.title}</h2>
                        <h2>{song.Artist.username}</h2>
                    </div>
                </div>
                <h2>WAVEFORM HERE</h2>
            </div>
            <img src={song.previewImage} alt={song.title} />
        </div>
    )
}