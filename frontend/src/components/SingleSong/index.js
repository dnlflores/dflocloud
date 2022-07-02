import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getSong, removeSong } from '../../store/songs';
import EditSongModal from '../EditSongModal';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Comments from '../Comments';

export default function SingleSong(props) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const song = useSelector(state => state.songs[songId]);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSong(songId));
    }, [dispatch]);

    const handleDelete = async event => {
        await dispatch(removeSong(event.target.value))
    };

    if(!song) return null;
    
    return (
        <div key={song.id}>
            <h2>{song.id}</h2>
            <h2>{song.title}</h2>
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
            <Comments />
        </div>
    )
}