import { NavLink } from "react-router-dom";

export default function LandingPage(props) {
    return (
        <>
            <h2>Landing Page!</h2>
            <NavLink to="/songs">Explore All Songs</NavLink>
            <NavLink to="/albums">Explore All Albums</NavLink>
        </>
        
    )
}