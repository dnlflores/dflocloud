import React, { useEffect, useState, createRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import { useNowPlaying } from './context/NowPlayingContext';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import Songs from './components/Songs';
import SingleSong from './components/SingleSong';
import Albums from './components/Albums';
import SingleAlbum from './components/SingleAlbum';
import Playlists from './components/Playlists';
import SinglePlaylist from './components/SinglePlaylist';
import Discover from './components/Discover';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { nowPlaying } = useNowPlaying();
  const audioPlayer = createRef();

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    if (document.location.href.split('/')[3] !== '') setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <LandingPage setIsLoaded={setIsLoaded} audioPlayer={audioPlayer} />
        </Route>
        <Route path="/songs/my">
          <Songs my={true} />
        </Route>
        <Route path="/songs/:songId">
          <SingleSong />
        </Route>
        <Route path="/songs">
          <Songs my={false} />
        </Route>
        <Route path="/albums/my">
          <Albums my={true} />
        </Route>
        <Route path="/albums/:albumId">
          <SingleAlbum />
        </Route>
        <Route path="/albums">
          <Albums my={false} />
        </Route>
        <Route path="/playlists/my">
          <Playlists my={true} />
        </Route>
        <Route path="/playlists/:playlistId">
          <SinglePlaylist />
        </Route>
        <Route path="/playlists">
          <Playlists my={false} />
        </Route>
        <Route path="/discover">
          <Discover audioPlayer={audioPlayer} />
        </Route>
      </Switch>
      <AudioPlayer className="main-audio-player" src={nowPlaying.songUrl} ref={audioPlayer} />
    </>
  );
}

export default App;
