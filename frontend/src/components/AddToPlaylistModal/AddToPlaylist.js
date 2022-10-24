import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSongToPlaylist } from "../../store/playlists";
import './AddToPlaylist.css';

export default function AddToPlaylist({ songId, setTrigger, playlists, header }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const addToPlaylist = async playlistId => {
        await dispatch(addSongToPlaylist(songId, playlistId));

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
                    <button className="add-plylst-btn" onClick={() => addToPlaylist(playlist.id)}>Add to Playlist</button>
                </div>
            ))}
        </div>
    )
}