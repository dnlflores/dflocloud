import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadSongForm from './UploadSongForm';

function UploadSongFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Upload Song!</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UploadSongForm setTrigger={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default UploadSongFormModal;