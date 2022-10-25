import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addSongToPlaylist, removeSongFromPlaylist } from "../../store/playlists";
import './AddToPlaylist.css';

export default function AddToPlaylist({ setTrigger, playlists }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();

    const addToPlaylist = async playlistId => {
        await dispatch(addSongToPlaylist(songId, playlistId));

        setTrigger(false);
    };

    const removeFromPlaylist = async playlistId => {
        await dispatch(removeSongFromPlaylist(songId, playlistId));

        setTrigger(false);
    };

    return (
        <div className="flx-ctr flx-col add-plylst-bckrnd">
            {!!playlists.length && playlists.map(playlist => (
                <div key={playlist.id} className="plylst-to-add">
                    <div className="flx-ctr plylst-img-name">
                        <img className="plylst-img" onClick={() => history.push(`/playlists/${playlist.id}`)} style={{ cursor: 'pointer' }} src={playlist.previewImage} alt={playlist.name} />
                        <p onClick={() => history.push(`/playlists/${playlist.id}`)} style={{ cursor: 'pointer' }}>{playlist.name}</p>
                    </div>
                    {playlist.Songs.find(song => +song.id === +songId) ? <button className="add-plylst-btn added" onClick={() => removeFromPlaylist(playlist.id)}>Added</button> : <button className="add-plylst-btn" onClick={() => addToPlaylist(playlist.id)}>Add to Playlist</button>}
                </div>
            ))}
        </div>
    )
}