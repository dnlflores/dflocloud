import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditAlbumForm from './EditAlbumForm';

export default function EditAlbumFormModal({ album }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Album</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditAlbumForm setTrigger={setShowModal} album={album} />
                </Modal>
            )}
        </>
    );
}