import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';
import loadingImg from '../../assets/loading.png';

export default function EditSongFormModal({ song }) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <button className="flx-ctr" onClick={() => setShowModal(true)}>Edit <span className="material-symbols-outlined">edit</span></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} style={{borderRadius: "20px", boxShadow: "10px 10px 15px black"}}>
                    <EditSongForm setTrigger={setShowModal} song={song} setLoading={setLoading} />
                </Modal>
            )}
            {loading && (
                <div className="background-loading flx-ctr">
                    <div className="loading-text flx-ctr">
                        <img src={loadingImg} alt="loading" />
                    </div>
                </div>
            )}
        </>
    );
}