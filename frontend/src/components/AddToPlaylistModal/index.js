import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import AddToPlaylist from './AddToPlaylist';
import CreatePlaylist from './CreatePlaylist';
import { getMyPlaylists } from '../../store/playlists';

export default function AddToPlaylistModal({ songId }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(0);
    const playlists = useSelector(state => state.playlists);
    const playlistsArr = Object.values(playlists || {}).filter(playlist => !playlist.Songs.find(song => song.id === +songId));

    useEffect(() => {
        dispatch(getMyPlaylists());
    }, [dispatch]);

    return (
        <>
            <button className="flx-ctr plylst-btn" onClick={() => setShowModal(true)}>Add to Playlist <span className="material-symbols-outlined">playlist_add</span></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="add-to-playlist-header">
                        {!!playlistsArr.length ? (
                            <>
                                <h2 className={selected === 0 ? 'selected' : ''} onClick={() => setSelected(0)}>Add to playlist</h2>
                                <h2 className={selected === 1 ? 'selected' : ''} onClick={() => setSelected(1)}>Create a playlist</h2>
                            </>
                        ) : (
                            <h2>Create a playlist</h2>
                        )}
                    </div>
                    {selected === 0 ? <AddToPlaylist setTrigger={setShowModal} songId={songId} playlists={playlistsArr} /> : <CreatePlaylist />}
                </Modal>
            )}
        </>
    );
}