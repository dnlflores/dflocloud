import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { getAlbum } from '../../store/albums';
import AudioPlayer from 'react-h5-audio-player';

export default function SingleAlbum(props) {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums[albumId]);

    useEffect(() => {
        dispatch(getAlbum(albumId));
    }, [dispatch, albumId])
    
    if(!album) return null;

    return (
        <>
            <h2>This is the Single Album Component</h2>
            <h3>{album.title}</h3>
            <h4>{album.Artist.username}</h4>
            <div>
                <h2>Songs</h2>
                {album.Songs.map(song => (
                    <>
                        <NavLink key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
                        <AudioPlayer src={song.songUrl} />
                        <img src={song.previewImage} alt={song.title} style={{width: "20vw"}} />
                    </>
                ))}
            </div>
        </>
    )
}