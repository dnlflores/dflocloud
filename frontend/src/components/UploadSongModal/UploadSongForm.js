import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadSong } from '../../store/songs';
import { getMyAlbums } from '../../store/albums';

export default function UploadSongForm(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [song, setSong] = useState(null);
    const [image, setImage] = useState(null);
    const [album, setAlbum] = useState(0);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const albums = useSelector(state => state.albums);
    const albumsArr = Object.values(albums || {});

    useEffect(() => {
        dispatch(getMyAlbums());
    }, [dispatch])

    useEffect(() => {
        const newErrors = [];

        if (title.length < 3) newErrors.push("Song title must be longer than 3 characters.");
        if (title.length > 50) newErrors.push("Song title must be less than 50 characters.");
        if (description.length < 10) newErrors.push("Description must be longer than 10 characters.");
        if (description.length > 300) newErrors.push("Description must be less than 300 characters.");
        if (album === 0) newErrors.push("Please select an album");

        setErrors(newErrors);

    }, [title, description, album]);

    const handleSubmit = async event => {
        event.preventDefault();
        
        if (!errors.length) {
            const data = {
                title,
                description,
                albumId: album,
                song,
                image
            }

            await dispatch(uploadSong(data));

            setTitle('');
            setDescription('');
            setSong(null);
            setAlbum(0);
            setImage(null);
            setHasSubmitted(false);
            setErrors([]);
            props.setTrigger(false);
        }
        setHasSubmitted(true);
    };

    const updateSongFile = (e) => {
        const file = e.target.files[0];
        if (file) setSong(file);
    };

    const updateImageFile = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    if (!albums) return null;

    return (
        <div>
            <h2>Upload Song Form</h2>
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
                    Choose an Album:
                    <select defaultValue={0} onChange={(e) => setAlbum(e.target.value)} required>
                        <option disabled value={0}>Please Select an Album</option>
                        {albumsArr.map(album => (
                            <option key={album.id} value={album.id}>{album.title}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Choose an mp3/mp4:
                    <input type="file" accept=".mp3,.mp4" onChange={updateSongFile} required />
                </label>
                <label>
                    Choose an image for this song:
                    <input type="file" accept="image/jpeg, image/png" onChange={updateImageFile} />
                </label>
                <button type="submit">Upload Song</button>
            </form>
        </div>

    )
}