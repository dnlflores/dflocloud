import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNowPlaying } from "../../context/NowPlayingContext";
import LinkedList from "../../helpers/LinkedList";
import { songPlayed } from "../../store/songs";

export default function PlayerInfoSect({ playlist, audioPlayer, playlistStarted, setPlaylistStarted }) {
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying, isPlaying, setQueue } = useNowPlaying();

    const handleClick = (e) => {
        e.stopPropagation();

        console.log("playlist started variable => ", playlistStarted);
        console.log("here is the playlist -> ", playlist);
        if (+playlistStarted !== +playlist.id) {
            const newQueue = new LinkedList();
            playlist.Songs.forEach(song => newQueue.add(song));
            setQueue(newQueue);
            setNowPlaying(newQueue.head);
            dispatch(songPlayed(playlist.Songs[0]));
            setPlaylistStarted(playlist.id)
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    if (!playlist.Songs) return null;

    return (
        <div className="flx-ctr background-player-info">
            <div className="flx-ctr play-song">
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? playlist.Songs.find(song => nowPlaying.element.id === song.id) ? "pause_circle" : "play_circle" : "play_circle"}</span>
                <div className="flx-ctr flx-col song-text">
                    <h2>{+playlistStarted === +playlist.id ? nowPlaying.element.title : playlist.name}</h2>
                    <h2>{+playlistStarted === +playlist.id ? nowPlaying.element.Artist.username : playlist.User.username}</h2>
                </div>
            </div>
            <img src={+playlistStarted === +playlist.id ? nowPlaying.element.previewImage : playlist.previewImage} alt={nowPlaying ? nowPlaying.element.title : playlist.name} />
        </div>
    )
}