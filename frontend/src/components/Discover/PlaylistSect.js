import Slider from "react-slick"
import PlaylistBox from "../Playlists/PlaylistBox"

export default function PlaylistSect({ playlists, sect, audioPlayer }) {
    const settings = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        variableWidth: true,
        adaptiveHeight: true,
        infinite: true,
        prevArrow: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iIMO7Yw051agNn2CqGGDLY5dwRgJJOrSeA&usqp=CAU" />,
        nextArrow: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Eo_circle_orange_arrow-right.svg/768px-Eo_circle_orange_arrow-right.svg.png" />
    };

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
        <section className="song-sect">
            <h3>{sect}</h3>
            <Slider {...settings}>
                {!!playlists.length && playlists.map(playlist => {
                    playlist.Songs = orderSongs(playlist);
                    return <PlaylistBox key={playlist.id} playlist={playlist} audioPlayer={audioPlayer} />
                })}
            </Slider>
        </section>
    )
}