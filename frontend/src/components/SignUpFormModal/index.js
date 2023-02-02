import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal({ styling, showModal, setShowModal, setShowLogin }) {
    const buttonStyling = styling ? styling : { width: "8rem", cursor: "pointer" };

    return (
        <>
            <button className="txt-algn-ctr org-btn" onClick={() => setShowModal(true)} style={buttonStyling}>Create Account</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} style={{borderRadius: "20px", boxShadow: "10px 10px 15px black"}}>
                    <SignUpForm setShowModal={setShowModal} setShowLogin={setShowLogin} />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;