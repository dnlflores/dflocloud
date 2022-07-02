import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadSong } from '../../store/songs';

export default function UploadSongForm(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [song, setSong] = useState(null);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        const newErrors = [];

        if (title.length < 3) newErrors.push("Song title must be longer than 3 characters.");
        if (title.length > 50) newErrors.push("Song title must be less than 50 characters.");
        if (description.length < 10) newErrors.push("Description must be longer than 10 characters.");
        if (description.length > 300) newErrors.push("Description must be less than 300 characters.");

        setErrors(newErrors);

    }, [title, description])

    const handleSubmit = async event => {
        event.preventDefault();
        if (!errors.length) {
            const data = {
                title,
                description,
                userId: currentUser.id,
                song
            }

            await dispatch(uploadSong(data));

            setTitle('');
            setDescription('');
            setSong(null);
            setHasSubmitted(false);
            setErrors([]);
            props.setTrigger(false);
        }
        setHasSubmitted(true);
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setSong(file);
    };

    return (
        <div>
            <h2>Upload Song Form</h2>
            {hasSubmitted && !!errors.length && errors.map(error => <div key={error}>{error}</div>)}
            <form
                style={{ display: "flex", flexFlow: "column" }}
                onSubmit={handleSubmit}
            >
                <label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    <input type="file" onChange={updateFile} />
                </label>
                <button type="submit">Upload Song</button>
            </form>
        </div>

    )
}