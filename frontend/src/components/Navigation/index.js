import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import UploadSongModal from '../UploadSongModal';
import CreateAlbumFormModal from '../CreateAlbumModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const sessionLinksStyle = {
        display: "flex",
        justifyContent: "space-around",
        width: "16rem"
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <UploadSongModal />
                <CreateAlbumFormModal />
                <NavLink to="/songs/my">Your Songs</NavLink>
                <NavLink to="/albums/my">Your Albums</NavLink>
                <NavLink to="/playlists/my">Playlists</NavLink>
            </>
        );
    } else {
        sessionLinks = (
            <div style={sessionLinksStyle}>
                <LoginFormModal />
                <SignUpFormModal />
            </div>
        );
    }

    return isLoaded && (
        <>
            <nav className="nav-bar flx-ctr flx-col" style={{ position: "fixed" }}>
                <div className="nav-container flx-ctr flx-jst-spc-btwn">
                    <h2 onClick={() => history.push("/")}>DFloCloud</h2>
                    {sessionLinks}
                </div>
            </nav>
        </>
    );
}

export default Navigation;