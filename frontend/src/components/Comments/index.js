import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, removeComment } from '../../store/comments';

export default function Comments(props) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const commentsObj = useSelector(state => state.comments);
    const currentUser = useSelector(state => state.session.user);
    const comments = Object.values(commentsObj || {});

    useEffect(() => {
        dispatch(getComments(songId));
    }, [dispatch, songId]);

    const handleDelete = async event => {
        console.log("here is the event target => ", event.target.id)
        await dispatch(removeComment(event.target.id));
    };

    console.log("here are the comments => ", comments)

    return (
        <div className="flx-col comment-list">
            {!!comments.length && <p><span className="material-symbols-outlined">chat_bubble</span>{`${comments.length} Comments`}</p>}
            {!!comments.length && comments.map(comment => (
                <div className="comment-card" key={comment.id}>
                    <div className="comment-info">
                        <img src={comment.User.profilePicUrl} alt="comment-user" />
                        <div className="user-info">
                            <p>{comment.User.username}</p>
                            <p style={{ color: 'black' }}>{comment.content}</p>
                        </div>
                    </div>
                    {currentUser && +currentUser.id === +comment.userId && (
                        <button className="flx-ctr delete-comment" onClick={handleDelete} value={comment.id}><span className="material-symbols-outlined" id={comment.id}>delete</span></button>
                    )}
                </div>
            ))}
        </div>
    )
}