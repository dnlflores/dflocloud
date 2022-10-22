import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { getSong, removeSong } from '../../store/songs';
import EditSongModal from '../EditSongModal';
import Comments from '../Comments';
import CreateCommentForm from '../Comments/CreateCommentForm';
import PlayerInfoSect from './PlayerInfoSect';
import './SingleSong.css';
import AddToPlaylistModal from '../AddToPlaylistModal';

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

    if (!song.Artist) return null;

    return (
        <div className="single-page">
            <PlayerInfoSect song={song} audioPlayer={audioPlayer} />
            <div className='flx-ctr flx-col comment-create-sect'>
                <div className="flx-ctr comment-pic-div">
                    <img src={currentUser ? currentUser.profilePicUrl : "https://cdn.pixabay.com/photo/2021/01/29/08/10/musician-5960112_960_720.jpg"} alt="current-user" className="comment-pro-pic" />
                    <CreateCommentForm />
                </div>
                <div className='flx-ctr song-user-btns'>
                    {currentUser && (
                        <AddToPlaylistModal songId={songId} />
                    )}
                    {currentUser && +currentUser.id === +song.userId && (
                        <>
                            <EditSongModal song={song} />
                            <button className="flx-ctr" id="delete-btn" onClick={handleDelete}>Delete <span className="material-symbols-outlined">delete_forever</span></button>
                        </>
                    )}
                </div>
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