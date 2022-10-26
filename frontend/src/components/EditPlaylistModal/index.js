import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlaylistForm from './EditPlaylistForm';

export default function EditPlaylistModal({ playlist }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="flx-ctr" onClick={() => setShowModal(true)}>Edit <span className="material-symbols-outlined">edit</span></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPlaylistForm setTrigger={setShowModal} playlist={playlist} />
                </Modal>
            )}
        </>
    );
}