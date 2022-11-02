import { useDispatch } from "react-redux";
import { useNowPlaying } from "../../context/NowPlayingContext";
import LinkedList from "../../helpers/LinkedList";
import { songPlayed } from "../../store/songs";

export default function PlayerInfoSect({ song, audioPlayer }) {
    const dispatch = useDispatch();
    const { nowPlaying, setNowPlaying, isPlaying, queue, setQueue } = useNowPlaying();

    const handleClick = (e) => {
        e.stopPropagation();

        let current = queue.head;
        console.log("this is current => ", current);
        while (current !== null) {
            if (current.element.id === song.id) break;

            current = current.next;
        }

        if (current === null){
            const newQueue = new LinkedList();
            newQueue.add(song);
            setNowPlaying(newQueue.head);
            dispatch(songPlayed(song));
            setQueue(newQueue)
        } else if (nowPlaying.element.id !== song.id) {
            setNowPlaying(current);
            dispatch(songPlayed(song));
        } else {
            audioPlayer.current.togglePlay(e);
        }
    };

    if (!song.Artist) return null;

    return (
        <div className="flx-ctr background-player-info">
            <div className="flx-ctr play-song">
                <span className="material-symbols-outlined play-btn flx-ctr" onClick={handleClick}>{isPlaying ? nowPlaying.element.id === song.id ? "pause_circle" : "play_circle" : "play_circle"}</span>
                <div className="flx-ctr flx-col song-text">
                    <h2>{song.title}</h2>
                    <h2>{song.Artist.username}</h2>
                </div>
            </div>
            <img src={song.previewImage} alt={song.title} />
        </div>
    )
}