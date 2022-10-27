import Slider from "react-slick";
import SongBox from "../Songs/SongBox";

export default function SongSect({ audioPlayer, songs, sect }) {
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

    return(
        <section className="song-sect">
            <h3>Charts: {sect}</h3>
            <Slider {...settings}>
                {!!songs.length && songs.map(song => (
                    <SongBox key={song.id} song={song} audioPlayer={audioPlayer} />
                ))}
            </Slider>
        </section>
    )
}