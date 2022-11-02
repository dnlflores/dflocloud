import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, Route, Switch, useParams } from 'react-router-dom';
import { getMySongs } from '../../store/songs';
import { getMyPlaylists } from '../../store/playlists';
import Overview from './Overview';
import Playlists from '../Playlists';
import Songs from '../Songs'
import './Library.css';

export default function Library({ audioPlayer }) {
    const dispatch = useDispatch();
    const mySongs = useSelector(state => state.songs.allSongs);
    const myPlaylists = useSelector(state => state.playlists);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMySongs());
        dispatch(getMyPlaylists());
    }, [dispatch])

    if (!currentUser) return <Redirect to="/" />

    if (!window.location.href.split('/')[4]) return <Redirect to="/library/me" />

    return (
        <div className="flx-ctr flx-col library-page">
            <div className="library-header">
                <NavLink to="/library/me" activeClassName="selectedHead">Overview</NavLink>
                <NavLink to="/library/playlists" activeClassName="selectedHead">Playlists</NavLink>
                <NavLink to="/library/tracks" activeClassName="selectedHead">Tracks</NavLink>
            </div>
            <Switch>
                <Route path="/library/me">
                    <Overview songs={Object.values(mySongs)} playlists={Object.values(myPlaylists)} />
                </Route>
                <Route path="/library/playlists">
                    <Playlists playlists={myPlaylists} audioPlayer={audioPlayer} />
                </Route>
                <Route path="/library/tracks">
                    <Songs songs={mySongs} audioPlayer={audioPlayer} />
                </Route>
            </Switch>
        </div>
    )
}