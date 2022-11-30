import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, removeComment } from '../../store/comments';

export default function Comments({ song }) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const commentsObj = useSelector(state => state.comments);
    const currentUser = useSelector(state => state.session.user);
    const comments = Object.values(commentsObj || {});
    const [dummyComments, setDummyComments] = useState([]);

    useEffect(() => {
        dispatch(getComments(songId));
        getDummyComments(songId);
    }, [dispatch, songId]);

    const handleDelete = async event => {
        await dispatch(removeComment(event.target.id));
    };

    const getDummyComments = async page => {
        const response = await fetch(`https://dummyapi.io/data/v1/comment?page=${page}`, { headers: { 'app-id': '6386edf58be5d48814c77783' } });
        const fakeComments = await response.json();
        console.log("dummy comments function running", fakeComments);
        setDummyComments(fakeComments.data);
    };

    console.log("here are the dummy comments => ", dummyComments);

    return (
        <div className="flx-col comment-list">
            <div className="page-description">
                <p style={{ color: 'black' }}>{song.description}</p>
            </div>
            <p><span className="material-symbols-outlined">chat_bubble</span>{`${comments.length + dummyComments.length} Comments`}</p>
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
            {!!dummyComments.length && dummyComments.map(comment => (
                <div className="comment-card" key={comment.id}>
                    <div className="comment-info">
                        <img src={comment.owner.picture} alt="comment-user" />
                        <div className="user-info">
                            <p>{comment.owner.firstName} {comment.owner.lastName}</p>
                            <p style={{ color: 'black' }}>{comment.message}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}