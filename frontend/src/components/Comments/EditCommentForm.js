import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editComment } from "../../store/comments";

export default function EditCommentForm(props) {
    console.log("these are the props => ", props);
    const { songId } = useParams();
    const dispatch = useDispatch();
    const [content, setContent] = useState(props.comment.content);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        const newErrors = [];

        if(content.length < 10) newErrors.push("Comment must be more than 10 characters.");
        if(content.length > 100) newErrors.push("Comment must be shorter than 100 characters.");

        setErrors(newErrors);
    }, [content])

    const handleSubmit = async event => {
        event.preventDefault();

        if(!errors.length) {
            const createdComment = await dispatch(editComment({content, songId, userId: currentUser.id}, props.comment.id));

            if(createdComment) {
                setContent('');
                setErrors([])
                setHasSubmitted(false);
                props.setTrigger(null);
            }
        }

        setHasSubmitted(true);
    };


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {hasSubmitted && errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Comment
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
            <button onClick={() => props.setTrigger(false)}>Cancel</button>
        </form>
    )
}