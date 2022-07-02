import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import UploadSongModal from '../UploadSongModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <UploadSongModal />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignUpFormModal />
            </>
        );
    }

    return (
        <>
            <nav className="nav-bar">
                <h2 onClick={() => history.push("/")}>DFloCloud</h2>
                <div>
                    {isLoaded && sessionLinks}
                    <NavLink to="/songs">Explore All Songs</NavLink>
                </div>
            </nav>
        </>
    );
}

export default Navigation;