import { csrfFetch } from "./csrf";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = user => ({
    type: SET_USER,
    user
});

const removeUser = () => ({
    type: REMOVE_USER
});

export const signup = (user) => async (dispatch) => {
    console.log("this is the user from the thunk => ", user);
    const { username, email, password, profilePicture } = user;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    if (profilePicture) formData.append("image", profilePicture);

    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const login = (credentials) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return data;
    }
};

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export default function sessionReducer(state = { user: null }, action) {
    switch (action.type) {
        case SET_USER: {
            return { user: action.user }
        }
        case REMOVE_USER: {
            return { user: null }
        }
        default:
            return state;
    }
}