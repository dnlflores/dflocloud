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
import Upload from './components/Upload';
import CustomPlayer from './components/CustomPlayer';
import Library from './components/Library';
import SearchResults from './components/SearchResults';
import Queue from './components/Queue';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState({});
  const [showQueue, setShowQueue] = useState(false);
  const { queue } = useNowPlaying();
  const audioPlayer = createRef();

  console.log("this is the queue => ", queue.toArray());

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    if (document.location.href.split('/')[3] !== '') setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      <Queue queueArr={queue.toArray()} showQueue={showQueue} />
      <Navigation isLoaded={isLoaded} results={results} setResults={setResults} />
      <Switch>
        <Route exact path="/">
          <LandingPage setIsLoaded={setIsLoaded} audioPlayer={audioPlayer} results={results} setResults={setResults} />
        </Route>
        <Route path="/songs/:songId">
          <SingleSong audioPlayer={audioPlayer} />
        </Route>
        <Route path="/songs">
          <Songs my={false} />
        </Route>
        <Route path="/albums/:albumId">
          <SingleAlbum />
        </Route>
        <Route path="/albums">
          <Albums my={false} />
        </Route>
        <Route path="/playlists/:playlistId">
          <SinglePlaylist audioPlayer={audioPlayer} />
        </Route>
        <Route path="/playlists">
          <Playlists my={false} />
        </Route>
        <Route path="/discover">
          <Discover audioPlayer={audioPlayer} />
        </Route>
        <Route path="/library">
          <Library audioPlayer={audioPlayer} />
        </Route>
        <Route path="/upload">
          <Upload />
        </Route>
        <Route path="/results">
          <SearchResults results={results} audioPlayer={audioPlayer} />
        </Route>
      </Switch>

      <div className="footer-div" />
      <CustomPlayer audioPlayer={audioPlayer} showQueue={showQueue} setShowQueue={setShowQueue} />
    </>
  );
}

export default App;
