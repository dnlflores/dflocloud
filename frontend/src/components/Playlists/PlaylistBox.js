import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNowPlaying } from "../../context/NowPlayingContext";
import LinkedList from "../../helpers/LinkedList";
import { songPlayed } from "../../store/songs";

export default function PlaylistBox({ playlist, audioPlayer }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { nowPlaying, setNowPlaying, isPlaying, setQueue } = useNowPlaying();
    const firstSong = playlist.Songs[0];

    const handleClick = (e) => {
        e.stopPropagation();
        if (nowPlaying.element.id !== firstSong.id) {
            const newQueue = new LinkedList();
            playlist.Songs.forEach(song => newQueue.add(song));
            setNowPlaying(newQueue.head);
            setQueue(newQueue);
            dispatch(songPlayed(firstSong));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    console.log("here is the playlist => ", playlist);

    return (
        <div className="flx-col ind-song">
            <div className="hover-bk flx-ctr" onClick={() => history.push(`/playlists/${playlist.id}`)}>
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? nowPlaying.element.id === firstSong.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
            </div>
            <img src={playlist.previewImage} className="song-box-image" alt="song" />
            <p className="song-name mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/playlists/${playlist.id}`)}>{playlist.name}</p>
            <p className="song-artist mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/playlists/${playlist.id}`)}>{playlist.User.username}</p>
        </div>
    )
}