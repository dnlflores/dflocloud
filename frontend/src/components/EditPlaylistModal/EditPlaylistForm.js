import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { editPlaylist } from '../../store/playlists';

export default function EditPlaylistForm({ setTrigger, playlist, setLoading }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(playlist.name);
    const [image, setImage] = useState(playlist.previewImage);
    const [description, setDescription] = useState(playlist.description);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const inputStyle = {
        width: "18rem",
        margin: ".5rem",
        '& .MuiInputBase-input': {
            fontSize: "14px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        },
        '& .MuiInputLabel-root': {
            fontSize: "14px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        },
        '& .MuiFormHelperText-root': {
            fontSize: "11px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        }
    };

    useEffect(() => {
        const newErrors = {};

        if (name.length < 3) newErrors.name = ("Playlist name must be longer than 3 characters.");
        if (name.length > 50) newErrors.name = ("Playlist name must be less than 50 characters.");
        if (description.length < 3) newErrors.description = ("Playlist description must be longer than 3 characters.");
        if (description.length > 500) newErrors.description = ("Playlist description must be less than 500 characters.");

        setErrors(newErrors);

    }, [name, description]);

    const handleSubmit = async event => {
        event.preventDefault();

        if (!Object.keys(errors).length) {
            const data = {
                name,
                image,
                description
            }

            setLoading(true);
            await dispatch(editPlaylist(data, playlist.id));

            setName('');
            setDescription('');
            setImage(null);
            setHasSubmitted(false);
            setErrors({});
            setLoading(false);
            setTrigger(false);
        }
        setHasSubmitted(true);
    };

    const updateImageFile = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleClick = e => {
        e.preventDefault();
        const fakeBtn = document.getElementById('fake-img-upld')
        fakeBtn.click();
    };

    const handleCancel = () => {
        setTrigger(false);
    };

    return (
        <form className='flx-ctr flx-col form-container' onSubmit={handleSubmit}>
            <div className="mid-form">
                <div className="left-side flx-ctr">
                    <img src={typeof image === 'string' ? image : image ? window.URL.createObjectURL(image) : 'https://us.123rf.com/450wm/motismotis/motismotis1805/motismotis180500005/102159464-retro-background-futuristic-landscape-1980s-style-digital-retro-landscape-cyber-surface-retro-music-.jpg'} alt="song-cover" className="input-image" />
                    <input type="file" accept="image/jpeg, image/png" onChange={updateImageFile} id="fake-img-upld" hidden />
                    <button className="sng-img-upld-btn flx-ctr" style={{ left: '4rem' }} onClick={handleClick}><span className="material-symbols-outlined">add_a_photo</span>Replace Image</button>
                </div>
                <div className="right-side flx-col">
                    <TextField
                        required
                        label="Name"
                        helperText={hasSubmitted && errors.name}
                        error={hasSubmitted && errors.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size="small"
                        sx={inputStyle}
                        color="warning"
                    />
                    <TextField
                        required
                        label="Description"
                        helperText={hasSubmitted && errors.description}
                        error={hasSubmitted && errors.description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        size="small"
                        sx={inputStyle}
                        color="warning"
                        multiline
                        rows={6}
                    />
                </div>
            </div>
            <div className="flx-ctr upld-btns">
                <button className="org-btn flx-ctr" type="submit">Edit Playlist</button>
                <button className="clr-btn brdr-gry" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}