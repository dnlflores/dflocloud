import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePlaylistForm from './CreatePlaylistForm';

export default function CreatePlaylistModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Curate your own Playlist!</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePlaylistForm setTrigger={setShowModal} />
                </Modal>
            )}
        </>
    );
}