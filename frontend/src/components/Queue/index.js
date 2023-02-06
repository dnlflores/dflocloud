import LinkedList from "../../helpers/LinkedList";
import { useNowPlaying } from "../../context/NowPlayingContext";
import "./Queue.css";

export default function Queue({ queueArr, showQueue }) {
    const { queue, setQueue, setNowPlaying } = useNowPlaying();

    const handleRemove = (song) => {
        const copyQ = new LinkedList();
        let current = queue.head;

        while (current !== null) {
            copyQ.add(current.element);
            current = current.next;
        }
        
        copyQ.removeElement(song);
        setQueue(copyQ);
        setNowPlaying(copyQ.head)
    };

    return (
        <div className={"queue-container " + (showQueue ? "fade-in" : "fade-out")}>
            {queueArr.map(song => (
                <div className="flx-ctr song-queue" key={song.id}>
                    <img src={song.previewImage} alt={song.title} />
                    <p>{song.title}</p>
                    <span onClick={() => handleRemove(song)} className="material-symbols-outlined">cancel</span>
                </div>
            ))}
        </div>
    )
}