import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { getSong, removeSong } from '../../store/songs';
import EditSongModal from '../EditSongModal';
import Comments from '../Comments';
import './SingleSong.css';
import PlayerInfoSect from './PlayerInfoSect';

export default function SingleSong({ audioPlayer }) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const song = useSelector(state => state.songs.singleSong);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSong(songId));
    }, [dispatch, songId]);

    const handleDelete = async event => {
        await dispatch(removeSong(event.target.value))
        history.push('/discover');
    };

    if (!song) return null;

    return (
        <div className="single-page">
            <PlayerInfoSect song={song} audioPlayer={audioPlayer} />
            <div className='flx-ctr flx-col'>
                {currentUser && +currentUser.id === +song.userId && (
                    <>
                        <button onClick={handleDelete} value={song.id}>Delete Song</button>
                        <EditSongModal song={song} />
                    </>
                )}
                <Comments />
            </div>
        </div>
    )
}