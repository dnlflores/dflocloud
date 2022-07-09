import React, { useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import Songs from './components/Songs';
import SingleSong from './components/SingleSong';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
    <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/songs/:songId">
          <SingleSong />
        </Route>
        <Route path="/songs">
          <Songs />
        </Route>
      </Switch>
      <AudioPlayer
          src={`https://www.mfiles.co.uk/mp3-downloads/beethoven-symphony7-2-liszt-piano.mp3`}
          onPlay={e => console.log("onPlay")}
          // other props here
      />
    </>
  );
}

export default App;
