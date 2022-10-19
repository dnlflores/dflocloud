import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';

function UploadSongFormModal({ song }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="flx-ctr" onClick={() => setShowModal(true)}>Edit <span className="material-symbols-outlined">edit</span></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSongForm setTrigger={setShowModal} song={song} />
                </Modal>
            )}
        </>
    );
}

export default UploadSongFormModal;