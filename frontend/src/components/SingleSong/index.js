import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { getSong, removeSong } from '../../store/songs';
import EditSongModal from '../EditSongModal';
import Comments from '../Comments';
import CreateCommentForm from '../Comments/CreateCommentForm';
import PlayerInfoSect from './PlayerInfoSect';
import './SingleSong.css';

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
        await dispatch(removeSong(songId))
        history.push('/discover');
    };

    if (!song.title) return null;

    return (
        <div className="single-page">
            <PlayerInfoSect song={song} audioPlayer={audioPlayer} />
            <div className='flx-ctr flx-col comment-create-sect'>
                <div className="flx-ctr comment-pic-div">
                    <img src={currentUser && currentUser.profilePicUrl} alt="current-user" className="comment-pro-pic" />
                    <CreateCommentForm />
                </div>
                {currentUser && +currentUser.id === +song.userId && (
                    <div className='flx-ctr song-user-btns'>
                        <button className="flx-ctr" id="delete-btn" onClick={handleDelete}>Delete <span className="material-symbols-outlined">delete_forever</span></button>
                        <EditSongModal song={song} />
                    </div>
                )}
            </div>
            <div className="artist-info-comment-list">
                <div className="flx-ctr flx-col artist-info">
                    <img className="song-artist-pic" src={song.Artist.profilePicUrl} alt="artist" />
                    <p>{song.Artist.username}</p>
                </div>
                <Comments />
            </div>
        </div>
    )
}