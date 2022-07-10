import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editPlaylist } from '../../store/playlists';

export default function EditPlaylistForm(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState(props.playlist.name);
    const [image, setImage] = useState(props.playlist.previewImage);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const newErrors = [];

        if (name.length < 3) newErrors.push("Playlist name must be longer than 3 characters.");
        if (name.length > 50) newErrors.push("Playlist name must be less than 50 characters.");

        setErrors(newErrors);

    }, [name]);

    const handleSubmit = async event => {
        event.preventDefault();

        if(!errors.length) {
            const data = {
                name,
                image
            }

            await dispatch(editPlaylist(data, props.playlist.id));

            setName('');
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
            <h2>Edit Playlist Form</h2>
            {hasSubmitted && !!errors.length && errors.map(error => <div key={error}>{error}</div>)}
            <form
                style={{ display: "flex", flexFlow: "column" }}
                onSubmit={handleSubmit}
            >
                <label>
                    Name:
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Choose a Playlist Cover:
                    <input type="file" accept="image/jpeg, image/png" onChange={updateFile} />
                </label>
                <button type="submit">Edit Playlist</button>
            </form>
        </div>

    )
}