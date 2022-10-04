import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uploadSong } from '../../store/songs';

export default function UploadSongForm({ songFiles, initialTitle }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    console.log("this is the initial title => ", initialTitle);

    useEffect(() => {
        const newErrors = [];

        if (title.length < 3) newErrors.push("Song title must be longer than 3 characters.");
        if (title.length > 50) newErrors.push("Song title must be less than 50 characters.");
        if (description.length < 10) newErrors.push("Description must be longer than 10 characters.");
        if (description.length > 300) newErrors.push("Description must be less than 300 characters.");

        setErrors(newErrors);

    }, [title, description]);

    useEffect(() => {
        setTitle(initialTitle.split('.')[0]);
    }, [initialTitle])

    const handleSubmit = async event => {
        event.preventDefault();
        
        if (!errors.length) {
            const data = {
                title,
                description,
                songs: songFiles,
                image
            }

            await dispatch(uploadSong(data));

            setTitle('');
            setDescription('');
            setImage(null);
            setHasSubmitted(false);
            setErrors([]);
        }
        setHasSubmitted(true);
        history.push("/discover")
    };

    const updateImageFile = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    console.log("this is the image => ", image)

    return (
        <div className='flx-ctr'>
            {hasSubmitted && !!errors.length && errors.map(error => <div key={error}>{error}</div>)}
            <div className="left-side">
                <img src={image ? window.URL.createObjectURL(image) : 'https://qph.cf2.quoracdn.net/main-qimg-0b4d3539b314fb898a95d424fe1af853-pjlq'} alt="song-cover" className="input-image" />
            </div>
            <form
                className="right-side flx-col"
                onSubmit={handleSubmit}
            >
                <label htmlFor='title'>Title</label>
                <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                <label htmlFor='description'>Description</label>
                <input
                    type="text"
                    placeholder="Description"
                    description="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Choose an image for this song</label>
                <input type="file" accept="image/jpeg, image/png" onChange={updateImageFile} />
                <button className="org-btn flx-ctr" type="submit">Upload Song</button>
            </form>
        </div>

    )
}