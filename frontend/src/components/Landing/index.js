import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { NavLink, useHistory } from "react-router-dom";
import { getSongs } from '../../store/songs';

export default function LandingPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const songsObj = useSelector(state => state.songs);
    const songs = Object.values(songsObj || {});

    console.log("these are the songs -> ", songs);

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch])

    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: "column", color: "white", backgroundColor: "white"}}>
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="banner" style={{width: "90vw", height: "70vh", objectFit: "cover", borderTop: "solid 5px orange"}} />
            <div style={{position: "absolute", top: "15rem", textAlign: "center"}}>
                <h2>Start Exploring Today!</h2>
                <h3>Start creating and sharing with your friends! Let those creative juices flow!</h3>
            </div>
            <NavLink to="/songs">Explore All Songs</NavLink>
            <NavLink to="/albums">Explore All Albums</NavLink>
            <div style={{width: "90vw", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h2 style={{color: "black"}}>Here's What's Trending!</h2>
                <div style={{color: "black", display: "flex", flexWrap: "wrap"}}>
                    {songsObj && songs.map(song => (
                        <div key={song.id} style={{display: "flex", flexDirection: "column", cursor: "pointer"}} onClick={() => history.push(`/songs/${song.id}`)}>
                            <img src={song.previewImage} style={{margin: "1rem", border: "black solid 2px", height: "10rem", width: "10rem", objectFit: "cover"}} alt="song" />
                            <p style={{textAlign: "center"}}>{song.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}