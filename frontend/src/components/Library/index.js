import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMySongs } from '../../store/songs';
import { getMyPlaylists } from '../../store/playlists';
import Overview from './Overview';
import './Library.css';

export default function Library() {
    const dispatch = useDispatch();
    const mySongs = useSelector(state => state.songs.allSongs);
    const myPlaylists = useSelector(state => state.playlists);
    const [selected, setSelected] = useState('Overview');

    useEffect(() => {
        dispatch(getMySongs());
        dispatch(getMyPlaylists());
    }, [dispatch])

    return (
        <div className="flx-ctr flx-col library-page">
            <div className="library-header">
                <h2 className={selected === 'Overview' ? 'selectedHead' : ''} onClick={() => setSelected('Overview')}>Overview</h2>
                <h2 className={selected === 'Playlists' ? 'selectedHead' : ''} onClick={() => setSelected('Playlists')}>Playlists</h2>
                <h2 className={selected === 'Tracks' ? 'selectedHead' : ''} onClick={() => setSelected('Tracks')}>Tracks</h2>
            </div>
            {selected === "Overview" && <Overview songs={Object.values(mySongs)} playlists={Object.values(myPlaylists)} />}
        </div>
    )
}