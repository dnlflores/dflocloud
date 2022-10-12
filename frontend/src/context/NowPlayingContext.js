import { useState, useContext, createContext } from "react";

export const NowPlayingContext = createContext();
export const useNowPlaying = () => useContext(NowPlayingContext);

export default function NowPlayingProvider({ children }) {
    const [nowPlaying, setNowPlaying] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState([]);

    return (
        <NowPlayingContext.Provider value={{ nowPlaying, setNowPlaying, isPlaying, setIsPlaying, queue, setQueue }}>
            {children}
        </NowPlayingContext.Provider>
    )
}