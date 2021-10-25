import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SearchEngineContainer from '../../components/SearchEngineContainer/SearchEngineContainer';
import { createImageUrl, requestMovie } from '../../utils/api-connector';


const MoviePage = () => {

    const [movieInfo, setMovieInfo] = useState({});
    const location = useLocation();

    const setResults = async () => {
        const tmdb_id_path_array = location.pathname.split("/");
        const tmdb_id = tmdb_id_path_array[tmdb_id_path_array.length - 1];
        const response = await requestMovie(tmdb_id);
        setMovieInfo(response.data);
    }

    // ComponentDidMount
    useEffect(async () => {
        await setResults();
    }, [])

    return (
        <div className='movie-page'>
            <SearchEngineContainer />
            <div className='container'>
                <div className='movie-page-header'>
                    <h1>{movieInfo.title}</h1>
                    <h2>{movieInfo.tagline}</h2>
                    {createImageUrl(movieInfo.backdrop_path, 5) && <img src={createImageUrl(movieInfo.backdrop_path, 5)} alt="Movie Backdrop"/>}
                </div>
            </div>
            <div className='movie-page-body'>
                <div className='movie-page-body__container'>
                    <h3>Overview</h3>
                    <p>{movieInfo.overview}</p>
                    <h3>Release Date</h3>
                    <p>{movieInfo.release_date}</p>
                </div>
            </div>
        </div>
    )
}


export default MoviePage;
