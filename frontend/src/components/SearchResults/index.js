import { Redirect } from "react-router-dom";
import PlaylistBox from "../Playlists/PlaylistBox";
import SongBox from "../Songs/SongBox";
import './SearchResults.css';

export default function SearchResults({ results, audioPlayer }) {
    const songs = Object.values(results.songs || {});
    const playlists = Object.values(results.playlists || {});

    if (!results.songs) return <Redirect to="/discover" />

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
                        {playlists.map(playlist => (
                            <PlaylistBox key={playlist.id} playlist={playlist} audioPlayer={audioPlayer} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}