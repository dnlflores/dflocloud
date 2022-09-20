import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ styling }) {
    const [showModal, setShowModal] = useState(false);
    const buttonStyling = styling ? styling : {border: "1px white solid", padding: "5px", borderRadius: "5px", width: "4rem", fontSize: "15px", textAlign: "center", cursor: "pointer"};

    return (
        <>
            <button onClick={() => setShowModal(true)} style={buttonStyling}>Sign In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;