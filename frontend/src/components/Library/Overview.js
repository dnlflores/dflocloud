import SongSect from "../Discover/SongSect";
import PlaylistSect from "../Discover/PlaylistSect";

export default function Overview({ songs, playlists }) {

    return (
        <div className="overview-page">
            <SongSect songs={songs} sect="My Tracks" />
            <PlaylistSect playlists={playlists} sect="My Playlists" />
        </div>
    )
}