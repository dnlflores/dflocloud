import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSongs } from "../../store/songs";
import SongSect from './SongSect';
import './Discover.css';

export default function Discover({ audioPlayer }) {
    const dispatch = useDispatch();
    const songsObj = useSelector(state => state.songs);
    const newSongs = Object.values(songsObj).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const hotSongs = Object.values(songsObj).sort((a, b) => b.timesPlayed - a.timesPlayed);

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch])

    return (
        <section className="discover-sect">
            <h2 className="discover-title">Discover Tracks and Playlists</h2>
            <SongSect audioPlayer={audioPlayer} songs={newSongs} sect="Newest Tracks" />
            <SongSect audioPlayer={audioPlayer} songs={hotSongs} sect="Hottest Tracks" />
        </section>
    )
}