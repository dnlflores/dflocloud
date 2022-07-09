import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateAlbumForm from './CreateAlbumForm';

export default function CreateAlbumFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create an Album!</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateAlbumForm setTrigger={setShowModal} />
                </Modal>
            )}
        </>
    );
}