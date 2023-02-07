import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlaylistForm from './EditPlaylistForm';

export default function EditPlaylistModal({ playlist }) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <button className="flx-ctr" onClick={() => setShowModal(true)}>Edit <span className="material-symbols-outlined">edit</span></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} style={{borderRadius: "20px", boxShadow: "10px 10px 15px black"}}>
                    <EditPlaylistForm setTrigger={setShowModal} playlist={playlist} setLoading={setLoading} />
                </Modal>
            )}
        </>
    );
}