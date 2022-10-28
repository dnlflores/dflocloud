import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import SearchBar from '../SearchBar';
import './Navigation.css';

function Navigation({ isLoaded, results, setResults }) {
    const sessionUser = useSelector(state => state.session.user);

    const sessionLinksStyle = {
        display: "flex",
        justifyContent: "space-around",
        width: "16rem",
        position: 'relative'
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className="nav-right" style={sessionLinksStyle}>
                <NavLink to='/upload' activeClassName="nav-active" className="nav flx-ctr">Upload</NavLink>
                <ProfileButton user={sessionUser} />
            </div>
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
            <nav className="flx-ctr flx-col nav-bar" style={{ position: "fixed" }}>
                <div className="flx-ctr flx-jst-spc-btwn nav-container">
                    <div className="nav-left">
                        <NavLink to='/' className="nav-logo flx-ctr">DFLOCLOUD</NavLink>
                        <NavLink to='/discover' className="nav flx-ctr" activeClassName="nav-active">Home</NavLink>
                        <NavLink to='/library' className="nav flx-ctr" activeClassName="nav-active">Library</NavLink>
                    </div>
                    <SearchBar results={results} setResults={setResults} />
                    {sessionLinks}
                </div>
            </nav>
        </>
    );
}

export default Navigation;