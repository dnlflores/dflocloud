import { useParams } from "react-router-dom"

export default function SingleSong(props) {
    const { id } = useParams();
    
    return (
        <h2>This is page for id of {id} </h2>
    )
}