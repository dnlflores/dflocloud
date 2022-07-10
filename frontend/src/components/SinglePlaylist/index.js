import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { getPlaylist, removeSongFromPlaylist } from '../../store/playlists';
import AudioPlayer from 'react-h5-audio-player';

export default function SinglePlaylist(props) {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const playlist = useSelector(state => state.playlists[playlistId]);

    useEffect(() => {
        dispatch(getPlaylist(playlistId));
    }, [dispatch, playlistId])

    const handleRemove = async e => {
        await dispatch(removeSongFromPlaylist(e.target.value, playlistId))
    };
    
    if(!playlist) return null;

    return (
        <>
            <h2>This is the Single Playlist Component</h2>
            <h3>{playlist.name}</h3>
            <div>
                <h2>Songs</h2>
                {playlist.Songs.map(song => (
                    <div key={song.id}>
                        <NavLink key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
                        <AudioPlayer src={song.songUrl} />
                        <img src={song.previewImage} alt={song.title} style={{width: "20vw"}} />
                        <button onClick={handleRemove} value={song.id}>Remove</button>
                    </div>
                ))}
            </div>
        </>
    )
}