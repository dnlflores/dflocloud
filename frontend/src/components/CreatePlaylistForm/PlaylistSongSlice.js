import { useState, useEffect } from "react"

export default function PlaylistSongSlice({ songFile, titles, setTitles, setSongFiles, allSongFiles, index }) {
    const [songName, setSongName] = useState(songFile.name.slice(0, songFile.name.length - 4));

    useEffect(() => {
        const newName = songFile.name.length < 50 ? songFile.name.slice(0, songFile.name.length - 4) : songFile.name.slice(0, 50);
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
        setSongName(e.target.value.length < 50 ? e.target.value : e.target.value.substring(0, 50));
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
            <span className="material-symbols-outlined" draggable>menu</span>
            <input type="text" onChange={handleChange} value={songName} />
            <span className="material-symbols-outlined" onClick={handleRemove}>cancel</span>
        </>
    )
}