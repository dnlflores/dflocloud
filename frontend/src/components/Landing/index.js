import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getSongs } from '../../store/songs';
import { getAllPlaylists } from '../../store/playlists';
import './Landing.css';

export default function LandingPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const songsObj = useSelector(state => state.songs);
    const loggedIn = useSelector(state => state.session.user);
    const songs = Object.values(songsObj || {});
    const landingBanner = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
    const continueBanner = "https://a-v2.sndcdn.com/assets/images/never_stop_listening@2x-ae7903ca.jpg";

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch])

    if (loggedIn) return <Redirect to="/songs" />

    return (
        <>
            <div className="page-container flx-ctr flx-col">
                <img src={landingBanner} alt="banner" className="landing-banner" />
                <div className="exploring-container pos-abs txt-algn-ctr flx-ctr flx-col">
                    <h2>Start Exploring Today!</h2>
                    <h3>Start creating and sharing with your friends! Let those creative juices flow!</h3>
                    <button onClick={() => history.push("/songs")} className="explore-songs-button flx-ctr org-btn">Explore All Songs</button>
                </div>
                <NavLink to="/albums">Explore All Albums</NavLink>
                <div className="trending-container flx-ctr flx-col">
                    <h2 style={{ color: "black" }}>Here's What's Trending!</h2>
                    <div className="flx-ctr flx-wrp" style={{ color: "black" }}>
                        {songsObj && songs.map(song => (
                            <div key={song.id} className="flx-col" style={{ cursor: "pointer" }} onClick={() => history.push(`/songs/${song.id}`)}>
                                <img src={song.previewImage} style={{ margin: "1rem", height: "10.75rem", width: "10.75rem", objectFit: "cover" }} alt="song" />
                                <p className="song-name mrgn-tp-0 txt-algn-lft">{song.title}</p>
                                <p className="song-artist mrgn-tp-0 txt-algn-lft">{song.Artist.username}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => history.push("/playlists")} className="explore-playlists-button org-btn flx-ctr">Explore Trending Playlists</button>
                </div>
            </div>
            <div className="flx-jst-strt continue-listening-container">
                <img src={continueBanner} alt="continue-listening" className="continue-listening" />
                <div className="flx-col">
                    <h2>Coming Soon</h2>
                    <h3>Soon you will be able to explore the website on mobile devices!</h3>                            
                </div>
            </div>
            <div className="flx-ctr flx-col" style={{ backgroundColor: 'white', width: '100vw' }}>
                <h2>Thank you for listening! Now's the time to join us!</h2>
                <h3>Save tracks, follow artists and build playlists. All for free.</h3>
                <button className="org-btn">Create account</button>
                <div className="flx-ctr">
                    <p>Already have an account?</p>
                    <button className='txt-algn-ctr' style={{ border: '1px lightgray solid', borderRadius: '5px', width: '5rem', height: '2rem' }}>Sign In</button>
                </div>
            </div>
        </>
    )
}