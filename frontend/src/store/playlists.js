import { csrfFetch } from "./csrf";

const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const READ_PLAYLISTS = "playlists/READ_PLAYLISTS";
const READ_PLAYLIST = "playlists/READ_PLAYLIST";
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST";
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST";
const ADD_TO_PLAYLIST = "playlists/ADD_TO_PLAYLIST";
const REMOVE_FROM_PLAYLIST = "playlists/REMOVE_FROM_PLAYLIST";

const createPlaylist = playlist => ({
    type: CREATE_PLAYLIST,
    playlist
});

const readPlaylists = playlists => ({
    type: READ_PLAYLISTS,
    playlists
});

const readPlaylist = playlist => ({
    type: READ_PLAYLIST,
    playlist
});

const updatePlaylist = playlist => ({
    type: UPDATE_PLAYLIST,
    playlist
});

const deletePlaylist = playlistId => ({
    type: DELETE_PLAYLIST,
    playlistId
})

const addToPlaylist = (playlistId, song) => ({
    type: ADD_TO_PLAYLIST,
    song,
    playlistId
});

const removeFromPlaylist = (playlistId, songId) => ({
    type: REMOVE_FROM_PLAYLIST,
    songId,
    playlistId
});

export const buildPlaylist = data => async dispatch => {
    const { name, image } = data;

    const formData = new FormData();
    formData.append("name", name);

    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/playlists/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if(response.ok) {
        const playlist = await response.json();
        dispatch(createPlaylist(playlist));
        return playlist;
    }
};

export const getUserPlaylists = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/playlists`);

    if(response.ok) {
        const playlists = await response.json();
        dispatch(readPlaylists(playlists));
        return playlists;
    }
};

export const getMyPlaylists = () => async dispatch => {
    const response = await csrfFetch("/api/playlists/me");

    if(response.ok) {
        const playlists = await response.json();
        dispatch(readPlaylists(playlists));
        return playlists;
    }
};

export const getPlaylist = id => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${id}`);

    if(response.ok) {
        const playlist = await response.json();
        dispatch(readPlaylist(playlist));
        return playlist;
    }
};

export const editPlaylist = (data, id) => async dispatch => {
    const { name, image } = data;

    const formData = new FormData();
    formData.append("name", name);

    if (typeof image !== "string") formData.append("image", image);
    else formData.append("image", image);

    const response = await csrfFetch(`/api/playlists/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if(response.ok) {
        const playlist = await response.json();
        dispatch(updatePlaylist(playlist));
        return playlist;
    }
};

export const removePlaylist = id => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${id}`, {
        method: "DELETE"
    });

    if(response.ok) {
        dispatch(deletePlaylist(id));
    }
};

export const addSongToPlaylist = (songId, playlistId) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ songId })
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addToPlaylist(data.playlistId, data.song))
        return data;
    }
};

export const removeSongFromPlaylist = (songId, playlistId) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ songId })
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(removeFromPlaylist(playlistId, songId))
        return data;
    }
};

export default function playlistsReducer(state = {}, action) {
    switch(action.type) {
        case CREATE_PLAYLIST: {
            const newState = {...state};
            newState[action.playlist.id] = action.playlist;
            return newState;
        }
        case READ_PLAYLISTS: {
            const newState = {};
            action.playlists.forEach(playlist => newState[playlist.id] = playlist);
            return newState;
        }
        case READ_PLAYLIST: {
            const newState = {...state};
            newState[action.playlist.id] = action.playlist;
            return newState;
        }
        case UPDATE_PLAYLIST: {
            const newState = {...state};
            newState[action.playlist.id] = action.playlist;
            return newState;
        }
        case DELETE_PLAYLIST: {
            const newState = {...state};
            delete newState[action.playlistId]
            return newState
        }
        case ADD_TO_PLAYLIST: {
            const newState = {...state};
            newState[action.playlistId].Songs.push(action.song);
            return newState;
        }
        case REMOVE_FROM_PLAYLIST: {
            const newState = {...state};
            const songs = newState[action.playlistId].Songs;
            const newSongs = [];
            for(let i = 0; i < songs.length; i++) {
                const song = songs[i];
                if(song.id !== action.songId) newSongs.push(song);
            }
            newState[action.playlistId].Songs = newSongs;
            return newState;
        }
        default:
            return state;
    }
}