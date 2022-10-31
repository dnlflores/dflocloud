import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import './SearchBar.css';

export default function SearchBar({ results, setResults }) {
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);
    const srchBtn = useRef();
    const orderedResults = [...Object.values(results.playlists || {}), ...Object.values(results.songs || {})].sort((a, b) => a.timesPlayed - b.timesPlayed);

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
    };

    const handleKeyUp = e => {
        e.preventDefault();
        
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            srchBtn.current.click();
            setShowResults(false);
        }
    };

    return (
        <div className="flx-ctr flx-col search-wrapper">
            <div className="flx-ctr search-bar">
                <input type="text" onKeyUp={handleKeyUp} onChange={e => setSearch(e.target.value)} value={search} placeholder="Search" onFocus={() => search ? setShowResults(true) : setShowResults(false)} />
                <button onClick={handleSearch} ref={srchBtn}><span className="material-symbols-outlined">search</span></button>
            </div>
            {showResults && (
                <>
                    <div className="closable" onClick={() => setShowResults(false)} />
                    <div style={{ position: 'relative' }}>
                        <div className="flx-ctr flx-col search-results">
                            {orderedResults.map((result, idx) => (
                                <div key={idx} className="flx-ctr" onClick={() => goToResult(result.name ? 'playlist' : 'song', result.id)}>
                                    <h3><span className="material-symbols-outlined">{result.name ? "queue_music" : "music_note"}</span>&nbsp;{result.name ? result.name : result.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}