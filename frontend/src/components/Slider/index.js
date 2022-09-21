import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Slider.css';

export default function Slider() {
    const history = useHistory();
    const [slideIndex, setSlideIndex] = useState(0);
    const landingBanner = "https://images.unsplash.com/photo-1529176601319-48a49e19725c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";

    useEffect(() => {
        const changeSlide = setInterval(() => setSlideIndex(prevIdx => prevIdx === 0 ? 1 : 0), 15000);

        return () => clearInterval(changeSlide);
    }, [])

    const moveDot = idx => {
        setSlideIndex(idx);
    };

    return (
        <div className="container-slider">
            <div className={slideIndex === 0 ? "exploring-container txt-algn-ctr flx-ctr flx-col slide active-anim" : "exploring-container txt-algn-ctr flx-ctr flx-col slide" }>
                <img src={landingBanner} alt="banner" className="landing-banner" />
                <div className="pos-abs">
                    <h2>Start Exploring Today!</h2>
                    <h3>Start creating and sharing with your friends! Let those creative juices flow!</h3>
                </div>
                <button onClick={() => history.push("/songs")} className="explore-songs-button flx-ctr org-btn">Explore All Songs</button>
            </div>
            <div className={slideIndex === 1 ? "exploring-container txt-algn-ctr flx-ctr flx-col slide active-anim" : "exploring-container txt-algn-ctr flx-ctr flx-col slide" }>
                <img src={`https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8`} alt="banner" className="landing-banner" />
                <div className="pos-abs">
                    <h2>Start Exploring Today!</h2>
                    <h3>Start creating and sharing with your friends! Let those creative juices flow!</h3>
                </div>
                <button onClick={() => history.push("/songs")} className="explore-songs-button flx-ctr org-btn">Explore All Songs</button>
            </div>
            <div className="container-dots">
                {Array.from({ length: 2 }).map((dot, idx) => (
                    <div key={idx} className={slideIndex === idx ? "dot active" : "dot"} onClick={() => moveDot(idx)} />
                ))}
            </div>
        </div>
    )
}