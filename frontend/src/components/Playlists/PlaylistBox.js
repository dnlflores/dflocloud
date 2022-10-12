import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNowPlaying } from "../../context/NowPlayingContext";
import { songPlayed } from "../../store/songs";

export default function PlaylistBox({ playlist, audioPlayer }) {
    let index = 0;
    const songs = playlist.Songs;
    const firstSong = songs[index];
    const dispatch = useDispatch();
    const history = useHistory();
    const { nowPlaying, setNowPlaying, isPlaying, setQueue } = useNowPlaying();

    const handleClick = (e) => {
        e.stopPropagation();
        if (nowPlaying.id !== firstSong.id) {
            setNowPlaying(firstSong);
            setQueue([...songs.slice(1)]);
            dispatch(songPlayed(firstSong));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    return (
        <div className="flx-col ind-song">
            <div className="hover-bk flx-ctr" onClick={() => history.push(`/playlists/${playlist.id}`)}>
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? nowPlaying.id === firstSong.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
            </div>
            <img src={playlist.previewImage} className="song-box-image" alt="song" />
            <p className="song-name mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/playlists/${playlist.id}`)}>{playlist.name}</p>
            <p className="song-artist mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/playlists/${playlist.id}`)}>{playlist.User.username}</p>
        </div>
    )
}