import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNowPlaying } from "../../context/NowPlayingContext";
import { songPlayed } from "../../store/songs";
import { Node } from "../../helpers/LinkedList";
import "./Songs.css";

export default function SongBox({ song, audioPlayer }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying, isPlaying, queue } = useNowPlaying();

    const handleClick = (e) => {
        e.stopPropagation();

        let current = queue.head;
        while (current !== null) {
            if (current.element.id === song.id) break;

            current = current.next;
        }

        if (current === null) current = new Node(song);

        if (nowPlaying.element.id !== song.id) {
            setNowPlaying(current);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
            setNowPlaying(current);
        }
    };

    return (
        <div className="flx-col ind-song">
            <div className="hover-bk flx-ctr" onClick={() => history.push(`/songs/${song.id}`)}>
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? nowPlaying.element.id === song.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
            </div>
            <img src={song.previewImage} className="song-box-image" alt="song" />
            <p className="song-name mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.title}</p>
            <p className="song-artist mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.Artist.username}</p>
        </div>
    )
}