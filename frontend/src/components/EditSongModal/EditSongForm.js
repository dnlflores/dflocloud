import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSong } from '../../store/songs';
import { getMyAlbums } from '../../store/albums';

export default function EditSongForm(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(props.song.title);
    const [description, setDescription] = useState(props.song.description);
    const [song, setSong] = useState(props.song.song);
    const [image, setImage] = useState(props.song.image);
    const [album, setAlbum] = useState(props.song.album);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);


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

            await dispatch(editSong(data, props.song.id));

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
            <h2>Edit Song Form</h2>
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
                <button type="submit">Edit Song</button>
            </form>
        </div>

    )
}