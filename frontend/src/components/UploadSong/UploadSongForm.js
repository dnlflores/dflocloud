import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uploadSong } from '../../store/songs';

export default function UploadSongForm({ songFiles }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
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

    return (
        <div>
            <h2>Upload Song Form</h2>
            {hasSubmitted && !!errors.length && errors.map(error => <div key={error}>{error}</div>)}
            <form
                className="flx-col"
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