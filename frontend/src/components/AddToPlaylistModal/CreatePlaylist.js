import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import { buildPlaylist, addSongToPlaylist } from "../../store/playlists";

export default function CreatePlaylist({ song, setTrigger, setSelected }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const inputStyle = {
        width: "90%",
        '& .MuiInputBase-input': {
            fontSize: "12px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        },
        '& .MuiInputLabel-root': {
            fontSize: "12px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        },
        '& .MuiFormHelperText-root': {
            fontSize: "11px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        },
        '& .MuiInputBase-root': {
            height: "35px"
        }
    };

    useEffect(() => {
        return () => setSelected(0);
    }, [dispatch])

    const handleCreate = async () => {
        const data = {
            name: title,
            description: `This is ${title} created with the song ${song.title}`,
            url: song.previewImage
        }
        const createdPlaylist = await dispatch(buildPlaylist(data));
        await dispatch(addSongToPlaylist(song.id, createdPlaylist.id));
        setTitle('');
        setTrigger(false);
    };

    return (
        <div className="flx-ctr flx-col add-plylst-bckrnd">
            <TextField
                required
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
                sx={inputStyle}
                color="warning"
            />
            <button className="org-btn" onClick={handleCreate}>Save</button>
            <div className="song-slice-plylst">
                <div className="flx-ctr crt-plylst-add">
                    <img src={song.previewImage} alt={song.title} />
                    <p style={{ color: '#999' }}>{song.Artist.username} -</p>
                    <p>&nbsp;{song.title}</p>
                </div>
            </div>
        </div>
    )
}