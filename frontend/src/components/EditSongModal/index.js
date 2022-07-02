import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';

function UploadSongFormModal({ song }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Song</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSongForm setTrigger={setShowModal} song={song} />
                </Modal>
            )}
        </>
    );
}

export default UploadSongFormModal;