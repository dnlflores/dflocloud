import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { WaveSurfer, WaveForm } from 'wavesurfer-react';
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

    console.log("this is the song => ", song)

    useEffect(() => {
        dispatch(getSong(songId));
    }, [dispatch, songId]);

    const handleDelete = async event => {
        await dispatch(removeSong(songId))
        history.push('/discover');
    };

    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        (waveSurfer) => {
            wavesurferRef.current = waveSurfer;

            if (wavesurferRef.current) {
                wavesurferRef.current.setMute(true);
                wavesurferRef.current.load(song.songUrl);

                wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready");
                });

                wavesurferRef.current.on("loading", (data) => {
                    console.log("loading --> ", data);
                });
            }
        }, [song]
    );

    const play = (isPlaying) => {
        if (wavesurferRef.current && isPlaying) wavesurferRef.current.play();
        else if(wavesurferRef.current) wavesurferRef.current.pause();
    };

    if (!song.Artist) return null;

    return (
        <div className="single-page">
            <PlayerInfoSect song={song} audioPlayer={audioPlayer} play={play} />
            <WaveSurfer onMount={handleWSMount}>
                <WaveForm id="waveform" cursorColor="transparent" backgroundColor='gray' progressColor='black' waveColor="white" interact={false} barWidth={0} />
            </WaveSurfer>
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