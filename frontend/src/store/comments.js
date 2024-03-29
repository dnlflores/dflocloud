import { csrfFetch } from "./csrf";

const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const READ_COMMENTS = 'comments/READ_COMMENTS';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const RESET = 'comments/RESET';

const createComment = comment => ({
    type: CREATE_COMMENT,
    comment
});

const readComments = comments => ({
    type: READ_COMMENTS,
    comments
});

const updateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
})

const deleteComment = commentId => ({
    type: DELETE_COMMENT,
    commentId
});

export const resetComments = () => ({
    type: RESET
})

export const generateComment = data => async dispatch => {
    const response = await csrfFetch(`/api/comments/${data.songId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        const comment = await response.json();
        dispatch(createComment(comment));
        return comment;
    }
};

export const getComments = songId => async dispatch => {
    const response = await csrfFetch(`/api/comments/${songId}`);

    if(response.ok) {
        const comments = await response.json();
        dispatch(readComments(comments));
        return comments;
    }
};

export const removeComment = commentId => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if(response.ok) {
        dispatch(deleteComment(commentId));
    }
};

export const editComment = (comment, id) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: "PATCH",
        body: JSON.stringify(comment)
    });

    if(response.ok) {
        const comment = await response.json();
        dispatch(updateComment(comment));
        return comment;
    }
};

export default function commentsReducer(state = {}, action) {
    switch(action.type) {
        case CREATE_COMMENT: {
            const newState = {...state};
            newState[action.comment.id] = action.comment;
            return newState;
        }
        case READ_COMMENTS: {
            const newState = {};
            action.comments.forEach(comment => newState[comment.id] = comment);
            return newState;
        }
        case UPDATE_COMMENT: {
            const newState = {...state};
            newState[action.comment.id] = action.comment;
            return newState;
        }
        case DELETE_COMMENT: {
            const newState = {...state};
            delete newState[action.commentId];
            return newState;
        }
        case RESET: {
            return {};
        }
        default:
            return state;
    }
}