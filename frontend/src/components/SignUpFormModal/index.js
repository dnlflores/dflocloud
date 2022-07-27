import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} style={{border: "solid 1px #ff5501", color: "white", borderRadius: "5px", padding: "5px", backgroundColor: "#ff5501", width: "8rem", textAlign: "center", cursor: "pointer"}}>Create Account</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;