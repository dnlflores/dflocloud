import React, { useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import Songs from './components/Songs';
import SingleSong from './components/SingleSong';

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
    </>
  );
}

export default App;
