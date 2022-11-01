import { useState, useContext, createContext } from "react";
import LinkedList, { Node } from "../helpers/LinkedList";

export const NowPlayingContext = createContext();
export const useNowPlaying = () => useContext(NowPlayingContext);

export default function NowPlayingProvider({ children }) {
    const [nowPlaying, setNowPlaying] = useState(new Node({}));
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState(new LinkedList());

    return (
        <NowPlayingContext.Provider value={{ nowPlaying, setNowPlaying, isPlaying, setIsPlaying, queue, setQueue }}>
            {children}
        </NowPlayingContext.Provider>
    )
}