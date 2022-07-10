import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddToPlaylistForm from './AddToPlaylistForm';

export default function AddToPlaylistModal({ songId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Add to a Playlist!</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddToPlaylistForm setTrigger={setShowModal} songId={songId} />
                </Modal>
            )}
        </>
    );
}