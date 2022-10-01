import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSongs } from "../../store/songs";
import SongBox from "../Songs/SongBox";

export default function New({ audioPlayer }) {
    const dispatch = useDispatch();
    const songsObj = useSelector(state => state.songs);
    const songs = Object.values(songsObj).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    useEffect(() => {
        dispatch(getSongs(15));
    }, [dispatch])

    return(
        <section className="new-hot">
            <h3>Charts: New & Hot</h3>
            <div className="song-list">
                {!!songs.length && songs.map(song => (
                    <SongBox key={song.id} song={song} audioPlayer={audioPlayer} />
                ))}
            </div>
        </section>
    )
}