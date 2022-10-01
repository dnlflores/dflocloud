import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSongs } from "../../store/songs";
import SongBox from "../Songs/SongBox";

export default function New() {
    const dispatch = useDispatch();
    const songsObj = useSelector(state => state.songs);
    const songs = Object.values(songsObj);

    useEffect(() => {
        dispatch(getSongs(15));
    }, [dispatch])

    return(
        <section className="new-hot">
            <h3>Charts: New & Hot</h3>
            <div className="song-list">
                {songs && songs.map(song => (
                    <SongBox key={song.id} song={song} />
                ))}
            </div>
        </section>
    )
}