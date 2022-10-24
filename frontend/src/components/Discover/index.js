import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSongs } from "../../store/songs";
import { getAllPlaylists } from "../../store/playlists";
import { resetComments } from "../../store/comments";
import SongSect from './SongSect';
import PlaylistSect from "./PlaylistSect";
import './Discover.css';

export default function Discover({ audioPlayer }) {
    const dispatch = useDispatch();
    const songsObj = useSelector(state => state.songs.allSongs);
    const playlistsObj = useSelector(state => state.playlists);
    const newSongs = Object.values(songsObj).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const hotSongs = Object.values(songsObj).sort((a, b) => b.timesPlayed - a.timesPlayed);
    const newPlaylists = Object.values(playlistsObj).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const hotPlaylists = Object.values(playlistsObj).sort((a, b) => b.timesPlayed - a.timesPlayed);

    useEffect(() => {
        dispatch(getSongs());
        dispatch(getAllPlaylists());
        dispatch(resetComments());
    }, [dispatch])

    return (
        <section className="discover-sect">
            <h2 className="discover-title">Discover Tracks and Playlists</h2>
            <SongSect audioPlayer={audioPlayer} songs={newSongs} sect="Newest Tracks" />
            <SongSect audioPlayer={audioPlayer} songs={hotSongs} sect="Hottest Tracks" />
            <PlaylistSect audioPlayer={audioPlayer} playlists={newPlaylists} sect="Newest Playlists" />
            <PlaylistSect audioPlayer={audioPlayer} playlists={hotPlaylists} sect="Hottest Playlists" />
        </section>
    )
}