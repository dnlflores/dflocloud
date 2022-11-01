import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNowPlaying } from "../../context/NowPlayingContext";
import LinkedList from "../../helpers/LinkedList";
import { songPlayed } from "../../store/songs";

export default function PlayerInfoSect({ playlist, audioPlayer, playlistStarted, setPlaylistStarted }) {
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying, isPlaying, setQueue } = useNowPlaying();
    const [currentSongIdx, setCurrentSongIdx] = useState(0)

    useEffect(() => {
        playlist.Songs.find((song, idx) => {
            if (song.id === nowPlaying.element.id) {
                setCurrentSongIdx(idx);
                return true;
            }
            return false;
        })
    }, [nowPlaying])

    const handleClick = (e) => {
        e.stopPropagation();
        // const tempQueue = playlist.Songs.slice(currentSongIdx + 1);
        const newQueue = new LinkedList();
        playlist.Songs.forEach(song => newQueue.add(song));
        setQueue(newQueue);
        if (!playlistStarted) {
            setNowPlaying(newQueue.head);
            dispatch(songPlayed(playlist.Songs[0]));
            setPlaylistStarted(true)
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
                    <h2>{playlistStarted ? nowPlaying.element.title : playlist.name}</h2>
                    <h2>{playlistStarted ? nowPlaying.element.Artist.username : playlist.User.username}</h2>
                </div>
            </div>
            <img src={playlistStarted ? nowPlaying.element.previewImage : playlist.Songs[0].previewImage} alt={nowPlaying ? nowPlaying.element.title : playlist.Songs[0].title} />
        </div>
    )
}