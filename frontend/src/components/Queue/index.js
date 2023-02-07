import { useState } from "react";
import LinkedList from "../../helpers/LinkedList";
import { useNowPlaying } from "../../context/NowPlayingContext";
import "./Queue.css";

export default function Queue({ queueArr, showQueue }) {
    const { queue, setQueue, setNowPlaying, nowPlaying } = useNowPlaying();
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

        current = copyQ.head;
        while (current !== null) {
            if (current.element === nowPlaying.element) nowPlaying.next = current.next;
            current = current.next;
        }

        const newPlaying = nowPlaying.element ? nowPlaying : queue.getSize() === 0 ? copyQ.head : null;

        setQueue(copyQ);
        setNowPlaying(newPlaying);
    };

    const onDragEnd = () => {
        const copyQ = new LinkedList();
        let current = queue.head;

        while (current !== null) {
            copyQ.add(current.element);
            current = current.next;
        }

        copyQ.switch(dragItemIndex, dragOverItemIndex);

        current = copyQ.head;
        while (current !== null) {
            if(current.element === nowPlaying.element) nowPlaying.next = current.next;
            current = current.next;
        }

        const newPlaying = nowPlaying.element ? nowPlaying : queue.getSize() === 0 ? copyQ.head : null;

        setQueue(copyQ);
        setNowPlaying(newPlaying);
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