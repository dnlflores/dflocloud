import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { buildPlaylist, addSongToPlaylist } from "../../store/playlists";

export default function CreatePlaylist({ song, setTrigger, setSelected }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    useEffect(() => {
        return () => setSelected(0);
    }, [dispatch])

    const handleCreate = async () => {
        const data = {
            name: title,
            description: `This is playlist created with the song ${song.title}`,
            url: song.previewImage
        }
        const createdPlaylist = await dispatch(buildPlaylist(data));
        await dispatch(addSongToPlaylist(song.id, createdPlaylist.id));
        setTitle('');
        setTrigger(false);
    };

    return (
        <div className="flx-ctr flx-col add-plylst-bckrnd">
            <label>Playlist title</label>
            <input type='text' onChange={e => setTitle(e.target.value)} value={title} />
            <button className="org-btn" onClick={handleCreate}>Save</button>
            <div className="song-slice-plylst">
                <div className="flx-ctr crt-plylst-add">
                    <img src={song.previewImage} alt={song.title} />
                    <p style={{ color: '#999' }}>{song.Artist.username} - </p>
                    <p>{song.title}</p>
                </div>
                <span className="material-symbols-outlined">close</span>
            </div>
        </div>
    )
}