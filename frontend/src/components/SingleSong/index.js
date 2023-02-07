import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { getSong, removeSong } from '../../store/songs';
import { useNowPlaying } from '../../context/NowPlayingContext';
import LinkedList, { Node } from '../../helpers/LinkedList';
import EditSongModal from '../EditSongModal';
import Comments from '../Comments';
import CreateCommentForm from '../Comments/CreateCommentForm';
import PlayerInfoSect from './PlayerInfoSect';
import AddToPlaylistModal from '../AddToPlaylistModal';
import './SingleSong.css';

export default function SingleSong({ audioPlayer }) {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const song = useSelector(state => state.songs.singleSong);
    const currentUser = useSelector(state => state.session.user);
    const { queue, setQueue, setNowPlaying, nowPlaying } = useNowPlaying();
    const [errorConf, setErrorConf] = useState(false);
    const [addQueue, setAddQueue] = useState(false);

    useEffect(() => {
        dispatch(getSong(songId));
    }, [dispatch, songId]);

    const handleDelete = async () => {
        await dispatch(removeSong(songId))
        history.push('/discover');
    };

    const addToFront = () => {
        const copyQ = new LinkedList();
        let current = queue.head;

        while (current !== null) {
            copyQ.add(current.element);
            current = current.next;
        }

        nowPlaying.next = copyQ.insertHead(song);
        const newPlaying = nowPlaying.element ? nowPlaying : queue.getSize() === 0 ? copyQ.head : null;

        setQueue(copyQ);
        setNowPlaying(newPlaying);
        setAddQueue(false);
    };

    const addToEnd = () => {
        const copyQ = new LinkedList();
        let current = queue.head;

        while (current !== null) {
            copyQ.add(current.element);
            current = current.next;
        }

        copyQ.add(song);

        current = copyQ.head;
        while (current !== null) {
            if(current.element === nowPlaying.element) nowPlaying.next = current.next;
            current = current.next;
        }

        const newPlaying = nowPlaying.element ? nowPlaying : queue.getSize() === 0 ? copyQ.head : null;

        setQueue(copyQ);
        setNowPlaying(newPlaying);
        setAddQueue(false);
    };

    const addNext = () => {
        const copyQ = new LinkedList();
        let current = queue.head;

        while (current !== null) {
            copyQ.add(current.element);
            current = current.next;
        }

        const index = copyQ.indexOf(nowPlaying.element);
        nowPlaying.next = copyQ.insertAt(song, index + 1);
        const newPlaying = nowPlaying.element ? nowPlaying : queue.getSize() === 0 ? copyQ.head : null;

        setQueue(copyQ);
        setNowPlaying(newPlaying);
        setAddQueue(false);
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
                <div className='flx-ctr song-user-btns' style={currentUser && +currentUser.id !== +song.userId ? { width: '17rem' } : {}}>
                    <button onClick={() => setAddQueue(true)} className="flx-ctr plylst-btn">Add to Queue<span className="material-symbols-outlined">queue_music</span></button>
                    {currentUser && (
                        <AddToPlaylistModal song={song} />
                    )}
                    {currentUser && +currentUser.id === +song.userId && (
                        <>
                            <EditSongModal song={song} />
                            <button className="flx-ctr" id="delete-btn" onClick={() => setErrorConf(true)}>Delete <span className="material-symbols-outlined">delete_forever</span></button>
                        </>
                    )}
                </div>
            </div>
            <div className="artist-info-comment-list">
                <div className="flx-ctr flx-col artist-info">
                    <img className="song-artist-pic" src={song.Artist.profilePicUrl} alt="artist" />
                    <p>{song.Artist.username}</p>
                </div>
                <Comments song={song} />
            </div>
            {errorConf && (
                <div className="flx-ctr error-conf-back">
                    <div className="flx-ctr flx-col error-conf">
                        <h2>Are you sure you want to delete this song?</h2>
                        <button className="red-btn" onClick={handleDelete}>Delete</button>
                        <button style={{ border: "1px solid #e5e5e5" }} className="clr-btn" onClick={() => setErrorConf(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {addQueue && (
                <div className="flx-ctr error-conf-back">
                    <div className="flx-ctr flx-col error-conf">
                        <h2>Where in the Queue?</h2>
                        <div className="flx-ctr">
                            <button className="org-btn" onClick={addToEnd}>Add Last</button>
                            <button className="prp-btn" onClick={queue.getSize() > 0 ? addNext : addToFront}>Add Next</button>
                        </div>    
                        <button style={{ border: "1px solid #e5e5e5" }} className="clr-btn" onClick={() => setAddQueue(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}