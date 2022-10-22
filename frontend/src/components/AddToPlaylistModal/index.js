import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddToPlaylistForm from './AddToPlaylistForm';

export default function AddToPlaylistModal({ songId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="flx-ctr plylst-btn" onClick={() => setShowModal(true)}>Add to Playlist <span className="material-symbols-outlined">playlist_add</span></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddToPlaylistForm setTrigger={setShowModal} songId={songId} />
                </Modal>
            )}
        </>
    );
}