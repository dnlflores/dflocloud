import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { songPlayed } from "../../store/songs";
import { removeSongFromPlaylist } from "../../store/playlists";
import { useNowPlaying } from "../../context/NowPlayingContext"
import LinkedList, { Node } from '../../helpers/LinkedList';

export default function SongList({ audioPlayer, setPlaylistStarted, playlist, songs }) {
    const dispatch = useDispatch();
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
    }, [isPlaying, playlist])

    const handleClick = (e, song, songIndex) => {
        e.stopPropagation();
        // const tempQueue = songs.slice(songIndex + 1);
        const newQueue = new LinkedList();
        playlist.Songs.forEach(song => newQueue.add(song));
        setQueue(newQueue);
        setPlaylistStarted(true);
        
        let current = newQueue.head;
        let count = 0;
        while (current !== null) {
            if (songIndex === count) break;

            count++;
            current = current.next;
        }

        if (nowPlaying.element.id !== song.id) {
            setNowPlaying(current);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    const handleRemove = async (e, song) => {
        e.stopPropagation();
        if (song.id === nowPlaying.element.id) {
            setPlaylistStarted(false);
            setIsPlaying(false);
            setNowPlaying(new Node({}));
        }
        const newQueue = queue;
        newQueue.removeElement(song);
        await dispatch(removeSongFromPlaylist(song.id, playlist.id));
    };

    return (
        <div className="flx-ctr flx-col plylst-page-songs">
            <div className="page-description">
                <p style={{ color: 'black' }}>{playlist.description}</p>
            </div>
            {songs.map((song, idx) => (
                <div className={isPlaying ? nowPlaying.element.id === song.id ? "plylst-song-slice playing" : "plylst-song-slice" : "plylst-song-slice"} key={song.id} onClick={e => handleClick(e, song, idx)}>
                    <div className="flx-ctr">
                        <img src={song.previewImage} alt={song.title} />
                        <span>{song.Artist.username} - </span>
                        <p>{song.title}</p>
                    </div>
                    {currentUser && currentUser.id === playlist.userId && (
                        <button className="rmv-song-btn" onClick={e => handleRemove(e, song)}><span className="material-symbols-outlined" id="rmv-song-btn">close</span></button>
                    )}
                    <span style={isPlaying && nowPlaying.element.id === song.id ? playing : {}} id="plylst-song-btn" className="material-symbols-outlined play-btn flx-ctr">{isPlaying ? nowPlaying.element.id === song.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
                </div>
            ))}
        </div>
    )
}