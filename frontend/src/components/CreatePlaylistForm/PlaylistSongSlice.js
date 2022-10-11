import { useState, useEffect } from "react"

export default function PlaylistSongSlice({ songFile, titles, setTitles, setSongFiles, allSongFiles }) {
    const [songName, setSongName] = useState(songFile.name.slice(0, songFile.name.length - 4));

    useEffect(() => {
        const newTitles = { ...titles };
        newTitles[songFile.name] = songName;
        setTitles(oldTitles => {
            return { ...oldTitles, ...newTitles }
        });
    }, [songName])

    const handleChange = e => {
        setSongName(e.target.value);
    };

    const handleRemove = () => {
        const removeTitles = { ...titles };
        delete removeTitles[songFile.name];
        setTitles(oldTitles => {
            return { ...oldTitles, ...removeTitles }
        });

        setSongFiles(allSongFiles.filter(file => file.path !== songFile.path))
    }

    return (
        <div className="flx-ctr song-slice">
            <span className="material-symbols-outlined">density_medium</span>
            <input type="text" onChange={handleChange} value={songName} />
            <span className="material-symbols-outlined" onClick={handleRemove}>cancel</span>
        </div>
    )
}