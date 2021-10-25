import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import SearchEngine from '../../components/SearchEngine/SearchEngine';
import { requestPopular, createImageUrl } from '../../utils/api-connector';


const HomePage = () => {

    const [carouselItems, setCarouselItems] = useState([]);

    const makeRequest = async () => {
        const popularResponse = await requestPopular();
        setCarouselItems(popularResponse);
    }

    useEffect(() => {
        (async () => {
            await makeRequest();
        })()
    }, [])

    return (
        <div className="container">
            <div className='home-page'>
                <p className='home-page__movie-quote'>Movies DB Animation App HomePage</p>
                <SearchEngine />
                <div className='carousel-container'>
                    {carouselItems.length > 0 &&
                        <Carousel
                        axis="horizontal"
                        autoPlay={true}
                        centerMode={true}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        {carouselItems.map((item, index) => (
                            <Link to={`movie/${item.id}`} key={index}>
                                <img src={createImageUrl(item.backdrop_path, 5)} />
                                <p className="legend">{item.title}</p>
                            </Link>
                        ))}
                    </Carousel>}
                </div>
            </div>
        </div>
    )
};

export default HomePage;
