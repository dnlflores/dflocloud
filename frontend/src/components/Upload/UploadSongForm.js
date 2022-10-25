import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uploadSong } from '../../store/songs';

export default function UploadSongForm({ songFiles, initialTitle, setShowSingleForm, setShowMultiForm, setDragDrop, setFiles, setLoading }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const newErrors = [];

        if (title.length < 3) newErrors.push("Song title must be longer than 3 characters.");
        if (title.length > 50) newErrors.push("Song title must be less than 50 characters.");
        if (description.length < 10) newErrors.push("Description must be longer than 10 characters.");
        if (description.length > 300) newErrors.push("Description must be less than 300 characters.");

        setErrors(newErrors);

    }, [title, description]);

    useEffect(() => {
        setTitle(initialTitle.length < 50 ? initialTitle.slice(0, initialTitle.length - 4) : initialTitle.slice(0, 50));
    }, [initialTitle])

    const handleSubmit = async event => {
        event.preventDefault();

        setHasSubmitted(true);

        if (errors.length) return alert('error');

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
        setErrors([]);
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
        setErrors([]);
        setFiles([])
    };

    return (
        <form className='flx-ctr flx-col form-container' onSubmit={handleSubmit}>
            {hasSubmitted && !!errors.length && errors.map(error => <div key={error}>{error}</div>)}
            <div className="mid-form">
                <div className="left-side flx-ctr">
                    <img src={image ? window.URL.createObjectURL(image) : 'https://qph.cf2.quoracdn.net/main-qimg-0b4d3539b314fb898a95d424fe1af853-pjlq'} alt="song-cover" className="input-image" />
                    <input type="file" accept="image/jpeg, image/png" onChange={updateImageFile} id="fake-img-upld" hidden />
                    <button className="sng-img-upld-btn flx-ctr" onClick={handleClick}><span className="material-symbols-outlined">add_a_photo</span>Upload Image</button>
                </div>
                <div className="right-side flx-col">
                    <div className="flx-col">
                        <label htmlFor='title'>Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flx-col">
                        <label htmlFor='description'>Description</label>
                        <textarea
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="flx-ctr upld-btns">
                <button className="org-btn flx-ctr" type="submit">Upload Song</button>
                <button className="clr-btn brdr-gry" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}