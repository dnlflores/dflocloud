import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { getPlaylist, removeSongFromPlaylist, removePlaylist } from '../../store/playlists';
import PlayerInfoSect from './PlayerInfoSect';
import EditPlaylistModal from '../EditPlaylistModal';
import SongList from './SongList';
import './SinglePlaylist.css';

export default function SinglePlaylist({ audioPlayer }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { playlistId } = useParams();
    const playlist = useSelector(state => state.playlists[playlistId]);
    const currentUser = useSelector(state => state.session.user);
    const [playlistStarted, setPlaylistStarted] = useState(false);

    useEffect(() => {
        dispatch(getPlaylist(playlistId));
    }, [dispatch, playlistId])

    const handleRemove = async e => {
        await dispatch(removeSongFromPlaylist(e.target.value, playlistId))
    };

    const handleRemovePlaylist = async () => {
        await dispatch(removePlaylist(playlist.id));
        history.push('/discover');
    };

    if (!playlist) return null;

    return (
        <div className="single-page">
            <PlayerInfoSect playlist={playlist} audioPlayer={audioPlayer} playlistStarted={playlistStarted} setPlaylistStarted={setPlaylistStarted} />
            <div className='flx-ctr song-user-btns plylst-usr-btns'>
                {currentUser && +currentUser.id === +playlist.userId && (
                    <>
                        <EditPlaylistModal playlist={playlist} />
                        <button className="flx-ctr" id="delete-btn" onClick={handleRemovePlaylist}>Delete <span className="material-symbols-outlined">delete_forever</span></button>
                    </>
                )}
            </div>
            <div className="artist-info-comment-list">
                <div className="flx-ctr flx-col artist-info">
                    <img className="song-artist-pic" src={playlist.User.profilePicUrl} alt="user" />
                    <p>{playlist.User.username}</p>
                </div>
                <SongList songs={playlist.Songs} audioPlayer={audioPlayer} setPlaylistStarted={setPlaylistStarted} />
            </div>
        </div>
    )
}