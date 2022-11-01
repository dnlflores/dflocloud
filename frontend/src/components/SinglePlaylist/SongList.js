import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { songPlayed } from "../../store/songs";
import { removeSongFromPlaylist } from "../../store/playlists";
import { useNowPlaying } from "../../context/NowPlayingContext"
import LinkedList from '../../helpers/LinkedList';

export default function SongList({ songs, audioPlayer, setPlaylistStarted, playlist }) {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const { nowPlaying, setNowPlaying, queue, setQueue, setIsPlaying, isPlaying } = useNowPlaying();
    const currentUser = useSelector(state => state.session.user);
    const playing = {
        display: 'flex',
        position: 'absolute',
        top: '15px',
        left: '5px',
        color: '#FF5500',
        fontSize: '20px',
    }

    useEffect(() => {
        if (!isPlaying) audioPlayer.current.audio.current.pause();
    }, [isPlaying])

    const handleClick = (e, song, songIndex) => {
        e.stopPropagation();
        const tempQueue = songs.slice(songIndex + 1);
        const newQueue = new LinkedList();
        tempQueue.forEach(song => newQueue.add(song));
        console.log("here is the new queue => ", newQueue);
        setQueue(newQueue);
        setPlaylistStarted(true);
        if (nowPlaying.id !== song.id) {
            setNowPlaying(song);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    const handleRemove = async (e, song) => {
        e.stopPropagation();
        if (song.id === nowPlaying.id) {
            setPlaylistStarted(false);
            setIsPlaying(false);
            setNowPlaying({});
        }
        const newQueue = queue;
        newQueue.removeElement(song);
        await dispatch(removeSongFromPlaylist(song.id, playlistId));
    };

    return (
        <div className="flx-ctr flx-col plylst-page-songs">
            <div className="page-description">
                <p style={{ color: 'black' }}>{playlist.description}</p>
            </div>
            {songs.map((song, idx) => (
                <div className={isPlaying ? nowPlaying.id === song.id ? "plylst-song-slice playing" : "plylst-song-slice" : "plylst-song-slice"} key={song.id} onClick={e => handleClick(e, song, idx)}>
                    <div className="flx-ctr">
                        <img src={song.previewImage} alt={song.title} />
                        <span>{song.Artist.username} - </span>
                        <p>{song.title}</p>
                    </div>
                    {currentUser && currentUser.id === playlist.userId && (
                        <button className="rmv-song-btn" onClick={e => handleRemove(e, song)}><span className="material-symbols-outlined" id="rmv-song-btn">close</span></button>
                    )}
                    <span style={isPlaying && nowPlaying.id === song.id ? playing : {}} id="plylst-song-btn" className="material-symbols-outlined play-btn flx-ctr">{isPlaying ? nowPlaying.id === song.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
                </div>
            ))}
        </div>
    )
}