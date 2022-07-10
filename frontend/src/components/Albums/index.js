import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums, getMyAlbums } from '../../store/albums';
import EditAlbumFormModal from '../EditAlbumModal';

export default function Albums(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const albums = useSelector(state => state.albums);
    const albumsArr = Object.values(albums || {});
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        if(props.my) dispatch(getMyAlbums());
        else dispatch(getAlbums())
    }, [dispatch, props.my]);

    if(!albums) return null;

    return (
        <>
            <h2>Albums</h2>
            {albumsArr.map(album => (
                <div key={album.id}>
                    <div onClick={() => history.push(`/albums/${album.id}`)}>
                        <h3>{album.title}</h3>
                        <h4>{album.Artist.username}</h4>
                        <p>{album.description}</p>
                        <img src={album.previewImage} alt={album.title} style={{width: "20vw"}} />
                    </div>
                    {currentUser.id === album.userId && <EditAlbumFormModal album={album} />}
                </div>
            ))}
        </>
    )
}