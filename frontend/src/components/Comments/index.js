import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, removeComment } from '../../store/comments';
import CreateCommentForm from './CreateCommentForm';
import EditCommentForm from './EditCommentForm';

export default function Comments(props) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [oldComment, setOldComment] = useState(null);
    const commentsObj = useSelector(state => state.comments);
    const currentUser = useSelector(state => state.session.user);
    const comments = Object.values(commentsObj || {});

    useEffect(() => {
        dispatch(getComments(songId));
    }, [dispatch, songId]);

    const handleDelete = async event => {
        await dispatch(removeComment(event.target.value));
    };

    return (
        <div>
            <button onClick={() => setShowCommentForm(true)}>Create Comment</button>
            {showCommentForm && (
                <CreateCommentForm setTrigger={setShowCommentForm} />
            )}
            {oldComment && (
                <EditCommentForm setTrigger={setOldComment} comment={oldComment}/>
            )}
            {comments && comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    <p>{comment.userId}</p>
                    {+currentUser.id === +comment.userId && (
                        <>
                            <button onClick={handleDelete} value={comment.id}>Delete Comment</button>
                            <button onClick={e => setOldComment(comment)} value={comment}>Edit Comment</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}