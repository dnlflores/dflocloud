import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import SearchBar from '../SearchBar';
import logo from '../../assets/logo/logo4.png';
import './Navigation.css';

function Navigation({ isLoaded, results, setResults }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

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
                <LoginFormModal showModal={showLogin} setShowModal={setShowLogin} setShowSignup={setShowSignup} />
                <SignUpFormModal showModal={showSignup} setShowModal={setShowSignup} setShowLogin={setShowLogin} />
            </div>
        );
    }

    return isLoaded && (
        <>
            <nav className="flx-ctr flx-col nav-bar" style={{ position: "fixed" }}>
                <div className="flx-ctr flx-jst-spc-btwn nav-container">
                    <div className="nav-left">
                        <NavLink to='/' className="nav-logo flx-ctr"><img src={logo} alt="logo" /></NavLink>
                        <NavLink to='/discover' className="nav flx-ctr" activeClassName="nav-active">Home</NavLink>
                        {sessionUser && <NavLink to='/library' className="nav flx-ctr" activeClassName="nav-active">Library</NavLink>}
                    </div>
                    <SearchBar results={results} setResults={setResults} />
                    {sessionLinks}
                </div>
            </nav>
        </>
    );
}

export default Navigation;