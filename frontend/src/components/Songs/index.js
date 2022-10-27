import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeSong } from '../../store/songs';
import EditSongModal from '../EditSongModal';
import AddToPlaylistModal from '../AddToPlaylistModal';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Songs({ songs }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const songsArr = Object.values(songs || {});

    const handleDelete = async event => {
        await dispatch(removeSong(event.target.value))
    };

    return (
        <>
            <h2>Songs component!</h2>
            {songs && songsArr.map(song => (
                <div key={song.id}>
                    <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                    <AudioPlayer
                        src={song.songUrl}
                        // onPlay={e => console.log("onPlay")}
                        // other props here
                    />
                    <AddToPlaylistModal songId={song.id} />
                    {currentUser && +currentUser.id === +song.userId && (
                        <>
                            <button onClick={handleDelete} value={song.id}>Delete Song</button>
                            <EditSongModal song={song}/>
                        </>
                    )}
                </div>
            ))}
        </>
    )
}