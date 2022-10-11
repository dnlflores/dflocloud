import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Draggable } from 'react-drag-reorder';
import { addSongToPlaylist, buildPlaylist } from '../../store/playlists';
import { uploadSong } from '../../store/songs';
import PlaylistSongSlice from './PlaylistSongSlice';
import './CreatePlaylistForm.css';

export default function CreatePlaylistForm({ songFiles, setSongFiles, setShowSingleForm, setShowMultiForm, setDragDrop }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [titles, setTitles] = useState({})

    useEffect(() => {
        const newErrors = [];

        if (name.length < 3) newErrors.push("Playlist name must be longer than 3 characters.");
        if (name.length > 50) newErrors.push("Playlist name must be less than 50 characters.");
        if (description.length < 10) newErrors.push("Playlist description must be longer than 10 characters.");
        if (description.length > 50) newErrors.push("Playlist description must be less than 50 characters.");

        setErrors(newErrors);

    }, [name, description]);

    const handleSubmit = async event => {
        event.preventDefault();

        if (!errors.length) {
            const playlistData = {
                name,
                image,
                description
            }

            const playlist = await dispatch(buildPlaylist(playlistData));
            const songs = await dispatch(uploadSong({ titles, songs: songFiles, description, image }));
            for(let i = 0; i < songs.length; i++) { 
                const song = songs[i];
                await dispatch(addSongToPlaylist(song.id, playlist.id))
            }

            setName('');
            setDescription('');
            setImage(null);
            setHasSubmitted(false);
            setErrors([]);
            setTitles({});

            history.push('/discover')
        }
        setHasSubmitted(true);
    };

    const updateFile = event => {
        const file = event.target.files[0];
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
        setName('');
        setDescription('');
        setImage(null);
        setHasSubmitted(false);
        setErrors([]);
        setTitles({});
    };

    const getChangedPos = (currentPos, newPos) => {
        const songOrder = [...songFiles];
        const file1 = songOrder[currentPos];
        const file2 = songOrder[newPos];
        songOrder[currentPos] = file2;
        songOrder[newPos] = file1;
        setSongFiles(songOrder);
        console.log("this is the current position => ", currentPos);
        console.log("this is the new position => ", newPos);
        console.log("these are the files => ", songOrder);
    };

    console.log("here are the song files => ", songFiles)

    return (
        <form className='flx-ctr flx-col form-container' onSubmit={handleSubmit}>
            {console.log("rendering playlist form")}
            {hasSubmitted && !!errors.length && errors.map(error => <div key={error}>{error}</div>)}
            <div className="mid-form">
                <div className="left-side flx-ctr">
                    <img src={image ? window.URL.createObjectURL(image) : 'https://qph.cf2.quoracdn.net/main-qimg-0b4d3539b314fb898a95d424fe1af853-pjlq'} alt="song-cover" className="input-image" />
                    <input type="file" accept="image/jpeg, image/png" onChange={updateFile} id="fake-img-upld" hidden />
                    <button className="sng-img-upld-btn flx-ctr" onClick={handleClick}><span className="material-symbols-outlined">add_a_photo</span>Upload Image</button>
                </div>
                <div className="right-side flx-col">
                    <div className="flx-col">
                        <label htmlFor='name'>Name</label>
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
            <div className="flx-ctr flx-col playlist-songs">
                <Draggable onPosChange={getChangedPos}>
                    {!!songFiles.length && songFiles.map(song => (
                        <PlaylistSongSlice key={song.path} songFile={song} allSongFiles={songFiles} setSongFiles={setSongFiles} titles={titles} setTitles={setTitles} />
                    ))}
                </Draggable>
            </div>
            <div className="flx-ctr upld-btns">
                <button className="org-btn flx-ctr" type="submit">Create Playlist</button>
                <button className="clr-btn brdr-gry" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}