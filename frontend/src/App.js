import React, { useEffect, useState, createRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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
          <SingleSong audioPlayer={audioPlayer} />
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
      </Switch>
      
      <div className="footer-div" />
      <CustomPlayer audioPlayer={audioPlayer} />
    </>
  );
}

export default App;
