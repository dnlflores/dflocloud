import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal({ styling }) {
    const [showModal, setShowModal] = useState(false);
    const buttonStyling = styling ? styling : { width: "8rem", cursor: "pointer" };

    return (
        <>
            <button className="txt-algn-ctr org-btn" onClick={() => setShowModal(true)} style={buttonStyling}>Create Account</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;