import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import songsReducer from './songs';
import commentsReducer from './comments';
import albumsReducer from './albums';
import playlistsReducer from './playlists';

const rootReducer = combineReducers({
    session: sessionReducer,
    songs: songsReducer,
    comments: commentsReducer,
    albums: albumsReducer,
    playlists: playlistsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;