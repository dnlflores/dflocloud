import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ styling, showModal, setShowModal, setShowSignup }) {
    return (
        <>
            <button onClick={() => setShowModal(true)} className={`clr-btn brdr-${styling}`}>Sign In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} style={{borderRadius: "20px", boxShadow: "10px 10px 15px black"}}>
                    <LoginForm setShowModal={setShowModal} setShowSignup={setShowSignup} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;