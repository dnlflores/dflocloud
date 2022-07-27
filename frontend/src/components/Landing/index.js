import { NavLink } from "react-router-dom";

export default function LandingPage(props) {
    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: "column", color: "white"}}>
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="banner" style={{width: "90vw", height: "70vh", objectFit: "cover", borderTop: "solid 5px orange"}} />
            <div style={{position: "absolute", top: "15rem", textAlign: "center"}}>
                <h2>Start Exploring Today!</h2>
                <h3>Start creating and sharing with your friends! Let those creative juices flow!</h3>
            </div>
            <NavLink to="/songs">Explore All Songs</NavLink>
            <NavLink to="/albums">Explore All Albums</NavLink>
            <h2 style={{color: "black"}}>Here's What's Trending!</h2>
        </div>
        
    )
}