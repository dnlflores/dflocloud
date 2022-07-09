import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSongs, removeSong, getMySongs } from '../../store/songs';
import EditSongModal from '../EditSongModal';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Songs(props) {
    console.log("these are the props -> ", props);
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);
    const currentUser = useSelector(state => state.session.user);
    const songsArr = Object.values(songs || {});

    useEffect(() => {
        if(props.my) dispatch(getMySongs());
        else dispatch(getSongs());
    }, [dispatch, props.my]);

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
                        onPlay={e => console.log("onPlay")}
                        // other props here
                    />
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