import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { useNowPlaying } from '../../context/NowPlayingContext';
import 'react-h5-audio-player/lib/styles.css';
import './CustomPlayer.css'

export default function CustomPlayer({ audioPlayer }) {
    const { nowPlaying, setNowPlaying, setIsPlaying, queue, setQueue } = useNowPlaying();

    const handleClickNext = () => {
        if (!nowPlaying.next) return;
        const nextSong = nowPlaying.next;
        setNowPlaying(nextSong);
    };
    
    const handleClickPrev = () => {
        if (!nowPlaying.prev) return;
        const nextSong = nowPlaying.prev;
        setNowPlaying(nextSong);
    };

    let content;

    if (!nowPlaying.element.title) content = (<p>Nothing Selected</p>);
    else content = (
        <>
            <img className="now-playing-img" src={nowPlaying.element.previewImage} alt="now-playing" />
            <div className="now-playing-title-artist">
                <p>{nowPlaying.element.title}</p>
                <p>{nowPlaying.element.Artist.username}</p>
            </div>
        </>
    );

    return (
        <div className='flx-ctr main-audio-player'>
            <AudioPlayer
                className='custom-player'
                layout='horizontal-reverse'
                src={nowPlaying.element.songUrl}
                ref={audioPlayer}
                showSkipControls={true}
                showJumpControls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClickNext={handleClickNext}
                onClickPrevious={handleClickPrev}
                onEnded={handleClickNext}
                autoPlayAfterSrcChange
                customControlsSection={
                    [
                        <div style={{ width: '10%'}} />,
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.VOLUME_CONTROLS,
                    ]
                }
            />
            <div className="flx-ctr custom-player-info">
                {content}
            </div>
        </div>
    )
}