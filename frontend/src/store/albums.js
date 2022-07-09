import { csrfFetch } from "./csrf";

const CREATE_ALBUM = "albums/CREATE_ALBUM";
const READ_ALBUMS = "albums/GET_ALBUMS";
const READ_ALBUM = "albums/GET_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

const createAlbum = album => ({
    type: CREATE_ALBUM,
    album
});

const readAlbum = album => ({
    type: READ_ALBUM,
    album
});

const readAlbums = (albums) => ({
    type: READ_ALBUMS,
    albums
});

const updateAlbum = album => ({
    type: UPDATE_ALBUM,
    album
});

const deleteAlbum = albumId => ({
    type: DELETE_ALBUM,
    albumId
});

export const buildAlbum = (data) => async dispatch => {
    const { title, description, image } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/albums/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (response.ok) {
        const newAlbum = await response.json();
        dispatch(createAlbum(newAlbum));
        return newAlbum;
    }
};

export const getAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums');

    if (response.ok) {
        const albums = await response.json();
        dispatch(readAlbums(albums));
        return albums;
    }
};

export const getMyAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums/me');

    if (response.ok) {
        const albums = await response.json();
        dispatch(readAlbums(albums));
        return albums;
    }
};

export const getAlbum = (id) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${id}`);

    if (response.ok) {
        const album = await response.json();
        dispatch(readAlbum(album));
        return album;
    }
};

export const editAlbum = (data, id) => async dispatch => {
    const { title, description, image } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/albums/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (response.ok) {
        const newAlbum = await response.json();
        dispatch(updateAlbum(newAlbum));
        return newAlbum;
    }
};

export const removeAlbum = id => async dispatch => {
    const response = await csrfFetch(`/api/albums/${id}`, {
        method: "DELETE"
    });

    if(response.ok) {
        dispatch(deleteAlbum(id));
    }
};

export default function albumsReducer(state = {}, action) {
    switch(action.type) {
        case CREATE_ALBUM: {
            const newState = {...state};
            newState[action.album.id] = action.album;
            return newState;
        }
        case READ_ALBUMS: {
            const newState = {};
            action.albums.forEach(album => newState[album.id] = album);
            return newState;
        }
        case READ_ALBUM: {
            const newState = {...state};
            newState[action.album.id] = action.album;
            return newState;
        }
        case UPDATE_ALBUM: {
            const newState = {...state};
            newState[action.album.id] = action.album
            return newState;
        }
        case DELETE_ALBUM: {
            const newState = {...state};
            delete newState[action.albumId];
            return newState;
        }
        default:
            return state;
    }
}