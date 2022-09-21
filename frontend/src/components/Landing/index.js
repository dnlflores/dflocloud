import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getSongs } from '../../store/songs';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import Slider from '../Slider';
import './Landing.css';

export default function LandingPage({ setIsLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const songsObj = useSelector(state => state.songs);
    const loggedIn = useSelector(state => state.session.user);
    const songs = Object.values(songsObj || {});
    const continueBanner = "https://a-v2.sndcdn.com/assets/images/never_stop_listening@2x-ae7903ca.jpg";

    useEffect(() => {
        setIsLoaded(false)
        dispatch(getSongs(12));
    }, [dispatch])

    if (loggedIn) return <Redirect to="/songs" />

    return (
        <>
            <div className="page-container flx-ctr flx-col">
                <div className="landing-nav flx-ctr flx-jst-spc-btwn">
                    <h2 onClick={() => history.push("/")}>DFloCloud</h2>
                    <div className='landing-nav-btns flx-jst-spc-arnd'>
                        <LoginFormModal />
                        <SignUpFormModal />
                    </div>
                </div>
                <Slider />
                <div className="trending-container flx-ctr flx-col">
                    <div className="flx-ctr flx-jst-spc-arnd search-container">
                        <form>
                            <input className="search-bar" type="text" placeholder="Search for artists, bands, tracks, podcasts"></input>
                            <span className="material-symbols-outlined search-btn" type="submit">search</span>
                        </form>
                        <p style={{ color: "black" }}>or</p>
                        <button className="org-btn upld-btn">Upload your own</button>
                    </div>
                    <div className="music-container flx-col flx-ctr">
                        <h2 className="trending-title">Here's What's Trending!</h2>
                        <div className="flx-ctr flx-wrp song-wrapper">
                            {songsObj && songs.map(song => (
                                <div key={song.id} className="flx-col ind-song" onClick={() => history.push(`/songs/${song.id}`)}>
                                    <img src={song.previewImage} style={{ margin: "1rem", height: "180px", width: "180px", objectFit: "cover" }} alt="song" />
                                    <p className="song-name mrgn-tp-0 txt-algn-lft">{song.title}</p>
                                    <p className="song-artist mrgn-tp-0 txt-algn-lft">{song.Artist.username}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => history.push("/playlists")} className="explore-playlists-button org-btn flx-ctr">Explore Trending Playlists</button>
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
                <SignUpFormModal styling={{ height: "2rem", width: "10rem", textAlign: "center", cursor: "pointer" }} />
                <div className="flx-ctr">
                    <p style={{ fontSize: '12px', padding: '1rem' }}>Already have an account?</p>
                    <LoginFormModal styling={{ height: "2rem", width: "5rem", border: "1px lightgray solid", borderRadius: "5px", textAlign: "center", cursor: "pointer" }} />
                </div>
            </div>
        </>
    )
}