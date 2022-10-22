import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { generateComment } from "../../store/comments";
import { Modal } from '../../context/Modal';
import SignUpForm from '../SignUpFormModal/SignUpForm';

export default function CreateCommentForm(props) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        const newErrors = [];

        if (content.length < 5) newErrors.push("Comment must be more than 5 characters.");
        if (content.length > 50) newErrors.push("Comment must be shorter than 50 characters.");

        setErrors(newErrors);
    }, [content])

    const handleSubmit = async event => {
        event.preventDefault();

        if (!currentUser) {
            return setShowModal(true);
        }

        if (!errors.length) {
            const createdComment = await dispatch(generateComment({ content, songId, userId: currentUser.id }));

            if (createdComment) {
                setContent('');
                setErrors([])
                setHasSubmitted(false);
                return;
            }
        }
        setHasSubmitted(true);
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    {hasSubmitted && errors.map((error, idx) => (
                        <p key={idx}>{error}</p>
                    ))}
                </div>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="comment-input"
                    placeholder="Write a comment"
                />
                {/* <button type="submit">Submit</button> */}
            </form>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    )
}