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

    const handleClick = (e) => {
        e.stopPropagation();
        if (nowPlaying.id !== song.id) {
            setNowPlaying(song);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    return (
        <div className="flx-col ind-song">
            <div className="hover-bk flx-ctr" onClick={() => history.push(`/songs/${song.id}`)}>
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{nowPlaying.id === song.id ? "pause_circle" : "play_circle"}</span>
            </div>
            <img src={song.previewImage} className="song-box-image" alt="song" />
            <p className="song-name mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.title}</p>
            <p className="song-artist mrgn-tp-0 txt-algn-lft" onClick={() => history.push(`/songs/${song.id}`)}>{song.Artist.username}</p>
        </div>
    )
}