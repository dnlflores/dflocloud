import { useDispatch } from "react-redux";
import { useNowPlaying } from "../../context/NowPlayingContext";
import { songPlayed } from "../../store/songs";

export default function PlayerInfoSect({ playlist, audioPlayer, playlistStarted, setPlaylistStarted }) {
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying, isPlaying } = useNowPlaying();

    const handleClick = (e) => {
        e.stopPropagation();
        if (!playlistStarted) {
            setNowPlaying(playlist.Songs[0]);
            dispatch(songPlayed(playlist.Songs[0]));
            setPlaylistStarted(true)
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    console.log("this is the playlist ? ", playlist);
    console.log("this is whats playing => ", nowPlaying);
    console.log("this is the audio player => ", audioPlayer);

    if (!playlist.Songs) return null;

    return (
        <div className="flx-ctr background-player-info">
            <div className="flx-ctr play-song">
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? playlist.Songs.find(song => nowPlaying.id === song.id) ? "pause_circle" : "play_circle" : "play_circle"}</span>
                <div className="flx-ctr flx-col song-text">
                    <h2>{playlistStarted ? nowPlaying.title : playlist.name}</h2>
                    <h2>{playlistStarted ? nowPlaying.Artist.username : playlist.User.username}</h2>
                </div>
            </div>
            <img src={playlistStarted ? nowPlaying.previewImage : playlist.Songs[0].previewImage} alt={nowPlaying ? nowPlaying.title : playlist.Songs[0].title} />
        </div>
    )
}