import New from './New';
import './Discover.css';

export default function Discover({ audioPlayer }) {

    return (
        <section className="discover-sect">
            <h2 className="discover-title">Discover Tracks and Playlists</h2>
            <New audioPlayer={audioPlayer} />
        </section>
    )
}