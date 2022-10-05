import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNowPlaying } from "../../context/NowPlayingContext";
import { songPlayed } from "../../store/songs";

export default function PlaylistBox({ playlist, audioPlayer }) {
    const firstSong = playlist.Songs[0];
    const dispatch = useDispatch();
    const history = useHistory();
    const { nowPlaying, setNowPlaying, isPlaying } = useNowPlaying();

    const handleClick = (e) => {
        e.stopPropagation();
        if (nowPlaying.id !== firstSong.id) {
            setNowPlaying(firstSong);
            dispatch(songPlayed(firstSong));
        } else {
            audioPlayer.current.togglePlay(e);
            setNowPlaying(firstSong);
        }
    };

    return (
        <div className="flx-col ind-song">
            <div className="hover-bk flx-ctr" onClick={() => history.push(`/playlists/${playlist.id}`)}>
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? nowPlaying.id === firstSong.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
            </div>
            <img src={playlist.previewImage} className="song-box-image" alt="song" />
            <p className="song-name mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/playlists/${playlist.id}`)}>{playlist.title}</p>
            <p className="song-artist mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/playlists/${playlist.id}`)}>{playlist.User.username}</p>
        </div>
    )
}