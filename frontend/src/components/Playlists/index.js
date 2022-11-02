import PlaylistBox from './PlaylistBox';

export default function Playlists({ playlists, audioPlayer }) {
    const playlistsArr = Object.values(playlists || {});

    const orderSongs = playlist => {
        const order = [];
        playlist.order.sort((a, b) => a.index - b.index);

        playlist.order.forEach(playlistSong => {
            const found = playlist.Songs.find(song => song.id === playlistSong.songId);
            if (found) order.push(found);
        });

        return order;
    };

    return (
        <div className="library-comp">
            {playlistsArr.map(playlist => {
                playlist.Songs = orderSongs(playlist);
                return <PlaylistBox playlist={playlist} audioPlayer={audioPlayer} key={playlist.id} />
            })}
        </div>
    )
}