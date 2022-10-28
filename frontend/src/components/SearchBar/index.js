import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './SearchBar.css';

export default function SearchBar() {
    const [search, setSearch] = useState('');

    console.log("here is the search term => ", search);
    useDebounce(() => console.log("fetch api with search term: ", search), 1000, [search]);

    return (
        <div className="flx-ctr search-bar">
            <input type="text" onChange={e => setSearch(e.target.value)} value={search} placeholder="Search" />
            <button><span className="material-symbols-outlined">search</span></button>
        </div>
    )
}