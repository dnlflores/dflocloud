import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removePlaylist } from '../../store/playlists';
import AudioPlayer from 'react-h5-audio-player';
import EditPlaylistModal from '../EditPlaylistModal';
import './Playlists.css';

export default function Playlists({ playlists }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const playlistsArr = Object.values(playlists || {});

    const handleDelete = async e => {
        await dispatch(removePlaylist(e.target.value));
    };

    if (!playlists) return null;

    return (
        <div className="playlist-temp">
            <h2>This is the playlists component</h2>
            {playlistsArr.map(playlist => (
                <div key={playlist.id}>
                    <NavLink to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                    <h2>Songs</h2>
                    {playlist.Songs.map((song, i) => (
                        < div key={song.id} >
                            <h3>{song.title}</h3>
                            <AudioPlayer src={song.songUrl} />
                        </div>
                    ))}
                    {currentUser && currentUser.id === playlist.userId && (
                        <>
                            <button onClick={handleDelete} value={playlist.id}>Delete Playlist</button>
                            <EditPlaylistModal playlist={playlist} />
                        </>
                    )}
                </div>
            ))
            }
        </div>
    )
}