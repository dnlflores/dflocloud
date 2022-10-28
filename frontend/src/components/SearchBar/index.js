import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import './SearchBar.css';

export default function SearchBar({ results, setResults }) {
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);

    useDebounce(() => {
        if (search !== '') fetch(`/api/search?term=${search}`).then(res => res.json().then(data => setResults(data)));
        else if (search === '') setResults({})
    }, 500, [search]);

    useEffect(() => {
        if (!search) setShowResults(false)
        else setShowResults(true)
    }, [results]);

    const goToResult = (typeResult, resultId) => {
        history.push(`/${typeResult}s/${resultId}`);
        setShowResults(false);
        setSearch('');
        setResults({});
    };

    const handleSearch = () => {
        history.push('/results');
        setShowResults(false);
    }

    return (
        <div className="flx-ctr flx-col search-wrapper">
            <div className="flx-ctr search-bar">
                <input type="text" onChange={e => setSearch(e.target.value)} value={search} placeholder="Search" onFocus={() => search ? setShowResults(true) : setShowResults(false)} />
                <button onClick={handleSearch}><span className="material-symbols-outlined">search</span></button>
            </div>
            {showResults && (
                <>
                    <div className="closable" onClick={() => setShowResults(false)} />
                    <div style={{ position: 'relative' }}>
                        <div className="flx-ctr flx-col search-results">
                            {results.songs && Object.values(results.songs).map(song => (
                                <div key={song.id} className="flx-ctr" onClick={() => goToResult('song', song.id)}>
                                    <h3><span className="material-symbols-outlined">music_note</span>&nbsp;{song.title}</h3>
                                </div>
                            ))}
                            {results.playlists && Object.values(results.playlists).map(playlist => (
                                <div key={playlist.id} className="flx-ctr" onClick={() => goToResult('playlist', playlist.id)}>
                                    <h3><span className="material-symbols-outlined">queue_music</span>&nbsp;{playlist.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}