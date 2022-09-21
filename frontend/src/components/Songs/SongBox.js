import { useHistory } from "react-router-dom";
import { useNowPlaying } from "../../context/NowPlayingContext";
import "./Songs.css";

export default function SongBox({ song }) {
    const history = useHistory();
    const { setNowPlaying } = useNowPlaying();

    return (
        <div className="flx-col ind-song">
            <img src={song.previewImage} className="song-box-image" alt="song" onClick={() => setNowPlaying(song.songUrl)} />
            <p className="song-name mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.title}</p>
            <p className="song-artist mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.Artist.username}</p>
        </div>
    )
}