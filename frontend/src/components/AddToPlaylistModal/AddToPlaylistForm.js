import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPlaylists, addSongToPlaylist } from "../../store/playlists";

export default function AddToPlaylistForm(props) {
    const dispatch = useDispatch();
    const [playlistId, setPlaylistId] = useState(0)
    const playlists = useSelector(state => state.playlists);
    const playlistsArr = Object.values(playlists || {}).filter(playlist => !playlist.Songs.find(song => song.id === +props.songId));
    
    useEffect(() => {
        dispatch(getMyPlaylists());
    }, [dispatch]);

    const handleSubmit = async e => {
        e.preventDefault();

        await dispatch(addSongToPlaylist(props.songId, playlistId));

        setPlaylistId(0);
        props.setTrigger(false);
    };

    if(!playlists) return null;

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Choose a Playlist:
                <select defaultValue={0} onChange={e => setPlaylistId(e.target.value)} required>
                    <option disabled value={0}>Please Choose a Playlist</option>
                    {playlistsArr.map(playlist => (
                        <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Add to Playlist!</button>
        </form>
    )
}