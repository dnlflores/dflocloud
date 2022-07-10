import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editAlbum } from '../../store/albums';

export default function CreateAlbumForm(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(props.album.title);
    const [description, setDescription] = useState(props.album.description);
    const [image, setImage] = useState(props.album.previewImage);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const newErrors = [];

        if (title.length < 3) newErrors.push("Album title must be longer than 3 characters.");
        if (title.length > 50) newErrors.push("Album title must be less than 50 characters.");
        if (description.length < 10) newErrors.push("Description must be longer than 10 characters.");
        if (description.length > 300) newErrors.push("Description must be less than 300 characters.");

        setErrors(newErrors);

    }, [title, description]);

    const handleSubmit = async event => {
        event.preventDefault();

        if(!errors.length) {
            const data = {
                title, 
                description,
                image
            }

            await dispatch(editAlbum(data, props.album.id));

            setTitle('');
            setDescription('');
            setImage(null);
            setHasSubmitted(false);
            setErrors([]);
            props.setTrigger(false);
        }
        setHasSubmitted(true);
    };

    const updateFile = event => {
        const file = event.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div>
            <h2>Edit Album Form</h2>
            {hasSubmitted && !!errors.length && errors.map(error => <div key={error}>{error}</div>)}
            <form
                style={{ display: "flex", flexFlow: "column" }}
                onSubmit={handleSubmit}
            >
                <label>
                    Title:
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Choose an Album Cover:
                    <input type="file" accept="image/jpeg, image/png" onChange={updateFile} />
                </label>
                <button type="submit">Edit Album</button>
            </form>
        </div>

    )
}