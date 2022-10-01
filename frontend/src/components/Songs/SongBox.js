import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNowPlaying } from "../../context/NowPlayingContext";
import { songPlayed } from "../../store/songs";
import "./Songs.css";

export default function SongBox({ song }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { setNowPlaying } = useNowPlaying();
    const currentUser = useSelector(state => state.session.user)

    const handleClick = () => {
        setNowPlaying(song.songUrl);
        if(currentUser) {
            song.timesPlayed++;
            dispatch(songPlayed(song));
        }
    };

    return (
        <div className="flx-col ind-song">
            <img src={song.previewImage} className="song-box-image" alt="song" onClick={handleClick} />
            <p className="song-name mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.title}</p>
            <p className="song-artist mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.Artist.username}</p>
        </div>
    )
}