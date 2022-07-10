import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyPlaylists } from '../../store/playlists';
import CreatePlaylistModal from '../CreatePlaylistModal';
import AudioPlayer from 'react-h5-audio-player'

export default function Playlists(props) {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists);
    const playlistsArr = Object.values(playlists || {});

    useEffect(() => {
        dispatch(getMyPlaylists());
    }, [dispatch]);
    
    if(!playlists) return null;

    return (
        <>
            <h2>This is the playlists component</h2>
            <CreatePlaylistModal />
            {playlistsArr.map(playlist => (
                <div key={playlist.id}>
                    <h3>{playlist.name}</h3>
                    <h2>Songs</h2>
                    {playlist.Songs.map(song => (
                        <div key={song.id}>
                            <h3>{song.title}</h3>
                            <AudioPlayer src={song.songUrl} />
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}