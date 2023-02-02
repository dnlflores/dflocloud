import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { getSongs } from '../../store/songs';
import { getAllPlaylists } from '../../store/playlists';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import Slider from '../Slider';
import SongBox from '../Songs/SongBox';
import SearchBar from '../SearchBar';
import logo from '../../assets/logo/logo3.png'
import './Landing.css';

export default function LandingPage({ setIsLoaded, audioPlayer, results, setResults }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const songsObj = useSelector(state => state.songs.allSongs);
    const loggedIn = useSelector(state => state.session.user);
    const songs = Object.values(songsObj).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const continueBanner = "https://a-v2.sndcdn.com/assets/images/never_stop_listening@2x-ae7903ca.jpg";

    useEffect(() => {
        setIsLoaded(false)
        dispatch(getSongs(12));
        dispatch(getAllPlaylists())
        
        return () => setIsLoaded(true);
    }, [dispatch])

    if (loggedIn) return <Redirect to="/discover" />

    return (
        <>
            <div className="flx-ctr flx-col page-container">
                <div className="flx-ctr flx-jst-spc-btwn landing-nav">
                    <img src={logo} alt="logo" />
                    <div className="flx-jst-spc-arnd landing-nav-btns">
                        <LoginFormModal styling="wht" showModal={showLogin} setShowModal={setShowLogin} setShowSignup={setShowSignup} />
                        <SignUpFormModal showModal={showSignup} setShowModal={setShowSignup} setShowLogin={setShowLogin} />
                    </div>
                </div>
                <Slider />
                <div className="flx-ctr flx-col trending-container">
                    <SearchBar results={results} setResults={setResults} />
                    <div className="music-container flx-col flx-ctr">
                        <h2 className="trending-title">Here's What's Trending!</h2>
                        <div className="flx-ctr flx-wrp song-wrapper">
                            {!!songs.length && songs.map(song => (
                                <SongBox key={song.id} song={song} audioPlayer={audioPlayer} />
                            ))}
                        </div>
                    </div>
                    <button onClick={() => history.push("/discover")} className="explore-playlists-button org-btn flx-ctr">Explore Trending Playlists</button>
                </div>
            </div>
            <div className="flx-jst-strt continue-listening-container">
                <img src={continueBanner} alt="continue-listening" className="continue-listening" />
                <div className="flx-col mobile-text">
                    <h2>Coming Soon</h2>
                    <h3 style={{ textAlign: 'center' }}>Soon you will be able to explore the website on mobile devices!</h3>
                </div>
            </div>
            <div className="flx-ctr flx-col landing-footer">
                <h2>Thank you for listening! Now's the time to join us!</h2>
                <h3>Save tracks, follow artists and build playlists. All for free.</h3>
                <SignUpFormModal styling={{ height: "2rem", width: "10rem", textAlign: "center", cursor: "pointer" }} showModal={showSignup} setShowModal={setShowSignup} setShowLogin={setShowLogin} />
                <div className="flx-ctr">
                    <p style={{ fontSize: '12px', padding: '1rem' }}>Already have an account?</p>
                    <LoginFormModal styling="gry" showModal={showLogin} setShowModal={setShowLogin} setShowSignup={setShowSignup} />
                </div>
            </div>
        </>
    )
}