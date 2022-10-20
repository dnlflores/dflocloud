import { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { WaveSurfer, WaveForm } from 'wavesurfer-react';
import { useNowPlaying } from "../../context/NowPlayingContext";
import { songPlayed } from "../../store/songs";

export default function PlayerInfoSect({ song, audioPlayer }) {
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying, isPlaying } = useNowPlaying();

    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        (waveSurfer) => {
            wavesurferRef.current = waveSurfer;

            if (wavesurferRef.current) {
                wavesurferRef.current.load("https://cdn.pixabay.com/audio/2022/10/05/audio_686ddcce85.mp3");

                wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready");
                });

                wavesurferRef.current.on("loading", (data) => {
                    console.log("loading --> ", data);
                });
            }
        }, []
    );

    const handleClick = (e) => {
        e.stopPropagation();
        if (nowPlaying.id !== song.id) {
            setNowPlaying(song);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    const play = useCallback(() => {
        wavesurferRef.current.playPause();
    }, []);

    if (!song.Artist) return null;

    return (
        <div className="flx-ctr background-player-info">
            <div className="flx-ctr play-song">
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? nowPlaying.id === song.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
                <div className="flx-ctr flx-col song-text">
                    <h2>{song.title}</h2>
                    <h2>{song.Artist.username}</h2>
                </div>
            </div>
            <WaveSurfer onMount={handleWSMount}>
                <WaveForm id="waveform" cursorColor="transparent" backgroundColor='black' progressColor='blue' waveColor="red" fillParent={false} interact={false} />
            </WaveSurfer>
            <button onClick={play}>play</button>
            <img src={song.previewImage} alt={song.title} />
        </div>
    )
}