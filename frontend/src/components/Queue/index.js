import { useState } from "react";
import LinkedList from "../../helpers/LinkedList";
import { useNowPlaying } from "../../context/NowPlayingContext";
import "./Queue.css";

export default function Queue({ queueArr, showQueue }) {
    const { queue, setQueue, setNowPlaying } = useNowPlaying();
    const [dragItemIndex, setDragItemIndex] = useState(-1);
    const [dragOverItemIndex, setDragOverItemIndex] = useState(-1);

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

    const onDragEnd = () => {
        const copyQ = new LinkedList();
        let current = queue.head;

        while (current !== null) {
            copyQ.add(current.element);
            current = current.next;
        }

        const moveElement = copyQ.removeFrom(dragItemIndex);
        copyQ.insertAt(moveElement, dragOverItemIndex);

        setQueue(copyQ);
        setNowPlaying(copyQ.head);
    };

    return (
        <div className={"queue-container " + (showQueue ? "fade-in" : "fade-out")}>
            {queueArr.map((song, i) => (
                <div className="flx-ctr song-queue" key={song.id} onDragEnd={onDragEnd} onDragEnter={() => setDragItemIndex(i)} onDragStart={() => setDragOverItemIndex(i)} onDragOver={e => e.preventDefault()}>
                    <span className="material-symbols-outlined" draggable>menu</span>
                    <img src={song.previewImage} alt={song.title} />
                    <p>{song.title}</p>
                    <span onClick={() => handleRemove(song)} className="material-symbols-outlined">cancel</span>
                </div>
            ))}
        </div>
    )
}