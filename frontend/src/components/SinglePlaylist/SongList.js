import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { songPlayed } from "../../store/songs";
import { removeSongFromPlaylist } from "../../store/playlists";
import { useNowPlaying } from "../../context/NowPlayingContext"

export default function SongList({ songs, audioPlayer, setPlaylistStarted, playlist }) {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const { nowPlaying, setNowPlaying, setQueue, setIsPlaying, isPlaying } = useNowPlaying();
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!isPlaying) audioPlayer.current.audio.current.pause();
    }, [isPlaying])

    const handleClick = (e, song, songIndex) => {
        e.stopPropagation();
        setQueue(songs.slice(songIndex + 1));
        setPlaylistStarted(true);
        if (nowPlaying.id !== song.id) {
            setNowPlaying(song);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    const handleRemove = async (e, songId) => {
        e.stopPropagation();
        if (songId === nowPlaying.id) {
            setPlaylistStarted(false);
            setIsPlaying(false);
            setNowPlaying({});
        }
        await dispatch(removeSongFromPlaylist(songId, playlistId));
    };

    return (
        <div className="flx-ctr flx-col plylst-page-songs">
            {songs.map((song, idx) => (
                <div className={ isPlaying ? nowPlaying.id === song.id ? "plylst-song-slice playing" : "plylst-song-slice" : "plylst-song-slice"} key={song.id} onClick={e => handleClick(e, song, idx)}>
                    <div className="flx-ctr">
                        <img src={song.previewImage} alt={song.title} />
                        <span>{song.Artist.username} - </span>
                        <p>{song.title}</p>
                    </div>
                    {currentUser && currentUser.id === playlist.userId && (
                        <button className="rmv-song-btn" onClick={e => handleRemove(e, song.id)}><span className="material-symbols-outlined" id="rmv-song-btn">close</span></button>
                    )}
                    <span id="plylst-song-btn" className="material-symbols-outlined play-btn flx-ctr">{isPlaying ? nowPlaying.id === song.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
                </div>
            ))}
        </div>
    )
}