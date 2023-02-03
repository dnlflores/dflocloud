import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { uploadSong } from '../../store/songs';

export default function UploadSongForm({ songFiles, initialTitle, setShowSingleForm, setShowMultiForm, setDragDrop, setFiles, setLoading }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const inputStyle = {
        width: "22rem",
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

        if (title.length < 3) newErrors.title = ("Song title must be longer than 3 characters.");
        if (title.length > 50) newErrors.title = ("Song title must be less than 50 characters.");
        if (description.length < 10) newErrors.description = ("Description must be longer than 10 characters.");
        if (description.length > 300) newErrors.description = ("Description must be less than 300 characters.");

        setErrors(newErrors);

    }, [title, description]);

    useEffect(() => {
        setTitle(initialTitle.length < 50 ? initialTitle.slice(0, initialTitle.length - 4) : initialTitle.slice(0, 50));
    }, [initialTitle])

    const handleSubmit = async event => {
        event.preventDefault();

        setHasSubmitted(true);

        if (Object.keys(errors).length) return alert('error');

        const data = {
            title,
            description,
            songs: songFiles,
            image
        }
        setLoading(true);
        await dispatch(uploadSong(data));

        setTitle('');
        setDescription('');
        setImage(null);
        setHasSubmitted(false);
        setErrors({});
        setLoading(false);
        history.push("/discover")
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
        setShowSingleForm(false);
        setShowMultiForm(false);
        setDragDrop(true);
        setTitle('');
        setDescription('');
        setImage(null);
        setHasSubmitted(false);
        setErrors({});
        setFiles([])
    };

    return (
        <form className='flx-ctr flx-col form-container' onSubmit={handleSubmit}>
            <div className="mid-form">
                <div className="left-side flx-ctr">
                    <img src={image ? window.URL.createObjectURL(image) : 'https://us.123rf.com/450wm/motismotis/motismotis1805/motismotis180500005/102159464-retro-background-futuristic-landscape-1980s-style-digital-retro-landscape-cyber-surface-retro-music-.jpg'} alt="song-cover" className="input-image" />
                    <input type="file" accept="image/jpeg, image/png" onChange={updateImageFile} id="fake-img-upld" hidden />
                    <button className="sng-img-upld-btn flx-ctr" onClick={handleClick}><span className="material-symbols-outlined">add_a_photo</span>Upload Image</button>
                </div>
                <div className="right-side flx-col">
                    <TextField
                        required
                        label="Title"
                        helperText={hasSubmitted && errors.title}
                        error={hasSubmitted && errors.title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                <button className="org-btn flx-ctr" type="submit">Upload Song</button>
                <button className="clr-btn brdr-gry" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}