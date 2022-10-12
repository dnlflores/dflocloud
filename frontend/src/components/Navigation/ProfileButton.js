import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const [clicked, setClicked] = useState(false);
    const currentUser = useSelector(state => state.session.user)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        setClicked(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
            setClicked(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <>
            <button onClick={openMenu} className={`flx-ctr profile-btn ${clicked ? 'clicked' : ''}`}>
                <img className="nav-profile-pic" src={currentUser.profilePicUrl} alt="user" />
                <p>{currentUser.username}</p>
            </button>
            {showMenu && (
                <div className="profile-dropdown flx-ctr flx-col">
                    <NavLink to="/playlists/my">My Playlists</NavLink>
                    <NavLink to="/songs/my">My Songs</NavLink>
                    <button onClick={logout}>Log Out</button>
                </div>
            )}
        </>
    );
}

export default ProfileButton;