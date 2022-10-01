import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNowPlaying } from "../../context/NowPlayingContext";
import { songPlayed } from "../../store/songs";
import "./Songs.css";

export default function SongBox({ song, audioPlayer }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying } = useNowPlaying();
    const [playPause, setPlayPause] = useState('');

    useEffect(() => {
        nowPlaying.id === song.id ? setPlayPause("pause_circle") : setPlayPause("play_circle");
    }, [])

    const handleClick = (e) => {
        if (nowPlaying.id !== song.id) {
            setNowPlaying(song);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }

        setPlayPause(prevState => prevState === "play_circle" ? "pause_circle" : "play_circle")
    };

    console.log("this is the audio player => ", audioPlayer);

    return (
        <div className="flx-col ind-song">
            <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{playPause}</span>
            <img src={song.previewImage} className="song-box-image" alt="song" onClick={() => history.push(`/songs/${song.id}`)} />
            <p className="song-name mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.title}</p>
            <p className="song-artist mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.Artist.username}</p>
        </div>
    )
}