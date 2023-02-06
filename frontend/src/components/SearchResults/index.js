import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PlaylistBox from "../Playlists/PlaylistBox";
import SongBox from "../Songs/SongBox";
import './SearchResults.css';

export default function SearchResults({ results, audioPlayer }) {
    const songs = Object.values(results.songs || {});
    const [playlists, setPlaylists] = useState(Object.values(results.playlists.matchedPlaylists));

    useEffect(() => {
        const orderedPlaylists = results.playlists.matchedPlaylists.map(playlist => {
            playlist.order = results.playlists.order.filter(playlistOrder => playlistOrder.playlistId === playlist.id);
            return playlist;
        });
        setPlaylists(orderedPlaylists);
    }, [])

    const orderSongs = playlist => {
        const order = [];
        playlist.order.sort((a, b) => a.index - b.index);

        playlist.order.forEach(playlistSong => {
            const found = playlist.Songs.find(song => song.id === playlistSong.songId);
            if (found) order.push(found);
        });

        return order;
    };

    if (!results.songs) return <Redirect to="/discover" />
    if (!playlists[0].order) return null;

    return (
        <div className="flx-ctr single-page results-page">
            {!!songs.length && (
                <>
                    <h2>{songs.length} Songs Found</h2>
                    <div className="results-container">
                        {songs.map(song => (
                            <SongBox key={song.id} song={song} audioPlayer={audioPlayer} />
                        ))}
                    </div>
                </>
            )}
            {!!playlists.length && (
                <>
                    <h2>{playlists.length} Playlists Found</h2>
                    <div className="results-container">
                        {playlists.map(playlist => {
                            playlist.Songs = orderSongs(playlist);
                            return <PlaylistBox key={playlist.id} playlist={playlist} audioPlayer={audioPlayer} />
                        })}
                    </div>
                </>
            )}
        </div>
    )
}