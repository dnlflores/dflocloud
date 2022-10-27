import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeSong } from '../../store/songs';
import EditSongModal from '../EditSongModal';
import AddToPlaylistModal from '../AddToPlaylistModal';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import SongBox from './SongBox';

export default function Songs({ songs, audioPlayer }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const songsArr = Object.values(songs || {});

    const handleDelete = async event => {
        await dispatch(removeSong(event.target.value))
    };

    return (
        <div className="library-comp">
            {songs && songsArr.map(song => (
                <SongBox song={song} audioPlayer={audioPlayer} />
            ))}
        </div>
    )
}