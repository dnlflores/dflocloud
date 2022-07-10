import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSong } from '../../store/songs';
import { getMyAlbums } from '../../store/albums';

export default function EditSongForm(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(props.song.title);
    const [description, setDescription] = useState(props.song.description);
    const [song, setSong] = useState(props.song.songUrl);
    const [image, setImage] = useState(props.song.previewImage);
    const [album, setAlbum] = useState(props.song.albumId);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const currentUser = useSelector(state => state.session.user);
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

    }, [title, description, album])

    const handleSubmit = async event => {
        event.preventDefault();
        if (!errors.length) {
            const data = {
                title,
                description,
                userId: currentUser.id,
                song,
                image,
                albumId: album
            }

            await dispatch(editSong(data, props.song.id));

            setTitle('');
            setDescription('');
            setSong(null);
            setImage(null);
            setAlbum(0);
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

    if(!albums) return null;

    return (
        <div>
            <h2>Edit Song Form</h2>
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
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <input type="file" accept=".mp3,.mp4" onChange={updateSongFile} />
                </label>
                <label>
                    Choose an image for this song:
                    <input type="file" accept="image/jpeg, image/png" onChange={updateImageFile} />
                </label>
                <button type="submit">Edit Song</button>
            </form>
        </div>

    )
}