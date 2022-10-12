import AudioPlayer from 'react-h5-audio-player';
import { useNowPlaying } from '../../context/NowPlayingContext';
import 'react-h5-audio-player/lib/styles.css';
import './CustomPlayer.css'

export default function CustomPlayer({ audioPlayer }) {
    const { nowPlaying, setNowPlaying, setIsPlaying, queue, setQueue } = useNowPlaying();

    const handleClickNext = () => {
        if(!queue.length) return;

        const newQueue = [...queue];
        const nextSong = newQueue.shift();
        setQueue(newQueue);
        setNowPlaying(nextSong);
    };

    let content;

    if (!nowPlaying.title) content = (<p>Nothing Selected</p>);
    else content = (
        <>
            <img className="now-playing-img" src={nowPlaying.previewImage} alt="now-playing" />
            <div className="now-playing-title-artist">
                <p>{nowPlaying.title}</p>
                <p>{nowPlaying.Artist.username}</p>
            </div>
        </>
    );

    return (
        <div className='flx-ctr main-audio-player'>
            <AudioPlayer
                className='custom-player'
                layout='horizontal-reverse'
                src={nowPlaying.songUrl}
                ref={audioPlayer}
                showSkipControls={true}
                showJumpControls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClickNext={handleClickNext}
                onEnded={handleClickNext}
                autoPlayAfterSrcChange
            />
            <div className="flx-ctr custom-player-info">
                {content}
            </div>
        </div>
    )
}