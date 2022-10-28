import PlaylistBox from './PlaylistBox';

export default function Playlists({ playlists, audioPlayer }) {
    const playlistsArr = Object.values(playlists || {});

    return (
        <div className="library-comp">
            {playlistsArr.map(playlist => (
                <PlaylistBox playlist={playlist} audioPlayer={audioPlayer} />
            ))}
        </div>
    )
}