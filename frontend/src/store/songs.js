import { csrfFetch } from "./csrf";

const CREATE_SONG = "songs/CREATE_SONG";
const READ_SONGS = "songs/GET_SONGS";
const READ_SONG = "songs/GET_SONG";
const UPDATE_SONG = "songs/UPDATE_SONG";
const DELETE_SONG = "songs/DELETE_SONG";

const createSong = song => ({
    type: CREATE_SONG,
    song
});

const readSong = song => ({
    type: READ_SONG,
    song
});

const readSongs = (songs) => ({
    type: READ_SONGS,
    songs
});

const updateSong = song => ({
    type: UPDATE_SONG,
    song
});

const deleteSong = songId => ({
    type: DELETE_SONG,
    songId
});

export const uploadSong = (data) => async dispatch => {
    const { title, description, song, image, albumId } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("albumId", albumId);

    if (song) formData.append("files", song);
    if (image) formData.append("files", image);

    const response = await csrfFetch(`/api/songs/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (response.ok) {
        const newSong = await response.json();
        dispatch(createSong(newSong));
        return newSong;
    }
};

export const getSongs = (size = 0) => async dispatch => {
    const response = size > 0 ? await csrfFetch(`/api/songs?size=${size}`) : await csrfFetch(`/api/songs`);

    if (response.ok) {
        const songs = await response.json();
        dispatch(readSongs(songs));
        return songs;
    }
};

export const getMySongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs/me');

    if (response.ok) {
        const songs = await response.json();
        dispatch(readSongs(songs));
        return songs;
    }
};

export const getSong = (id) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}`);

    if (response.ok) {
        const song = await response.json();
        dispatch(readSong(song));
        return song;
    }
};

export const editSong = (data, id) => async dispatch => {
    const { title, description, song, image, albumId } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("albumId", albumId);

    if (typeof song !== "string") formData.append("files", song);
    else formData.append("songUrl", song);

    if (typeof image !== "string") formData.append("files", image);
    else formData.append("imageUrl", image);

    const response = await csrfFetch(`/api/songs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (response.ok) {
        const newSong = await response.json();
        console.log("this is the new song", newSong);
        dispatch(updateSong(newSong));
        return newSong;
    }
};

export const removeSong = id => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSong(id));
    }
};

export const songPlayed = song => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}/play`, {
        method: "PATCH"
    });

    if (response.ok) {
        const updated = await response.json();
        dispatch(updateSong(updated));
        return updated;
    }
};

export default function songsReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_SONG: {
            const newState = { ...state };
            newState[action.song.id] = action.song;
            return newState;
        }
        case READ_SONGS: {
            const newState = {};
            action.songs.forEach(song => newState[song.id] = song);
            return newState;
        }
        case READ_SONG: {
            const newState = { ...state };
            newState[action.song.id] = action.song;
            return newState;
        }
        case UPDATE_SONG: {
            const newState = { ...state };
            newState[action.song.id] = { ...newState[action.song.id], ...action.song };
            return newState;
        }
        case DELETE_SONG: {
            const newState = { ...state };
            delete newState[action.songId];
            return newState;
        }
        default:
            return state;
    }
}