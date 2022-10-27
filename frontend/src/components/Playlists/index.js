import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removePlaylist } from '../../store/playlists';
import AudioPlayer from 'react-h5-audio-player';
import EditPlaylistModal from '../EditPlaylistModal';
import './Playlists.css';
import PlaylistBox from './PlaylistBox';

export default function Playlists({ playlists, audioPlayer }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const playlistsArr = Object.values(playlists || {});

    const handleDelete = async e => {
        await dispatch(removePlaylist(e.target.value));
    };

    if (!playlists) return null;

    return (
        <div className="library-comp">
            {playlistsArr.map(playlist => (
                <PlaylistBox playlist={playlist} audioPlayer={audioPlayer} />
            ))}
        </div>
    )
}