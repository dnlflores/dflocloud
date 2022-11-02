import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { getPlaylist, removePlaylist } from '../../store/playlists';
import { useNowPlaying } from '../../context/NowPlayingContext';
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
    const [playlistStarted, setPlaylistStarted] = useState("");
    const { nowPlaying } = useNowPlaying();

    useEffect(() => {
        dispatch(getPlaylist(playlistId));
    }, [dispatch, playlistId]);

    useEffect(() => {
        if (playlist) orderSongs();
        if (nowPlaying.element.id) setPlaylistStarted(playlistId);
    }, [playlist])

    const handleRemovePlaylist = async () => {
        await dispatch(removePlaylist(playlistId));
        history.push('/discover');
    };

    const orderSongs = () => {
        const order = [];
        playlist.order.sort((a, b) => a.index - b.index);

        playlist.order.forEach(playlistSong => {
            const found = playlist.Songs.find(song => song.id === playlistSong.songId);
            if (found) order.push(found);
        });

        playlist.Songs = order;
        return order;
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
                <SongList audioPlayer={audioPlayer} setPlaylistStarted={setPlaylistStarted} playlist={playlist} songs={orderSongs()} />
            </div>
        </div>
    )
}