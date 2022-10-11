import { useState, useEffect } from "react"

export default function PlaylistSongSlice({ songFile, titles, setTitles, setSongFiles, allSongFiles, index }) {
    const [songName, setSongName] = useState('');

    useEffect(() => {
        const newName = songFile.name.slice(0, songFile.name.length - 4);
        setSongName(newName)
    }, [songFile]);

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
        <>
            <input type="text" onChange={handleChange} value={songName} />
            <span className="material-symbols-outlined" onClick={handleRemove}>cancel</span>
        </>
    )
}