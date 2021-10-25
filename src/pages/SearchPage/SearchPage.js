import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import qs from 'qs';

import { motion, useAnimation } from 'framer-motion';
import Pagination from 'react-mui-pagination';

import SearchEngineContainer from '../../components/SearchEngineContainer/SearchEngineContainer';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loading from '../../components/Loading/Loading';

import { createImageUrl, requestSearch } from '../../utils/api-connector';


const SearchPage = ({ location }) => {

    let history = useHistory();

    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageResults, setPageResults] = useState(1);

    const makeRequest = async () => {
        setLoading(true);
        setResults([]);
        const { "keyword": parseKeyword, "page": parsePage } = qs.parse(location.search, { ignoreQueryPrefix: true });
        if ( !parsePage ) {
            setCurrentPage(1);
        }
        if (parseKeyword) {
            const { "results": responseResults,
                    "totalPages": responseTotalPages,
                    "totalResults": responseTotalResults } = await requestSearch(parseKeyword, parsePage);
            setKeyword(parseKeyword);
            setTotalResults(responseTotalResults);
            setTotalPages(responseTotalPages);
            setPageResults(responseResults.length);
            setResults(responseResults);
            setCurrentPage(parsePage);
            setLoading(false);
        }
    }

    const changePage = (e, p) => {
        setCurrentPage(p);
        const parseKeyword = qs.parse(location.search, { ignoreQueryPrefix: true }).keyword;
        const redirectPath = `/search?keyword=${parseKeyword}&page=${p}`;
        history.push(redirectPath);
    }

    useEffect(() => {
        makeRequest();
    }, [location]);

    useEffect(() => {
        if (!loading) {
            runAnimation();
        }
    }, [loading]);

    // Animation Functionality
    const cardCollectionControls = useAnimation();
    const cardControls = useAnimation();
    const imageControls = useAnimation();
    const textControls = useAnimation();

    const totalDuration = 1.;
    const slideInDuration = totalDuration / 4;
    const fadeInDuration = totalDuration / 4;
    const getInCardDuration = slideInDuration + fadeInDuration;
    const pulseInDuration = totalDuration - getInCardDuration;

    const slideIn = {
        duration: slideInDuration,
        initial: {
            x: "-100vw",
        },
        final: i => ({
            x: 0,
            transition: {
                duration: slideInDuration,
                delay: i * getInCardDuration
            }
        })
    }

    const fadeIn = {
        duration: fadeInDuration,
        initial: {
            opacity: 0
        },
        final: i => ({
            opacity: 1,
            transition: {
                duration: fadeInDuration,
                delay: i * getInCardDuration + slideInDuration
            }
        })
    }

    const pulseIn = {
        scale: [1, 1.25, 1],
        transition: {
            duration: pulseInDuration,
        }
    }

    const showUp = {
        opacity: 1.
    }

    const cardGetInEffect = async () => {
        cardControls.set(slideIn.initial);
        imageControls.set(fadeIn.initial);
        cardCollectionControls.set(showUp);
        cardControls.start(slideIn.final);
        const response = await imageControls.start(fadeIn.final);
        // When the first animations complete, the flag just changes its value in order to trigger the useEffect
        setFadeInFinishedFlag(prevState => !prevState);
        return response;
    }

    const pulseInEffect = async () => {
        textControls.start(pulseIn);
        setAnimsRunning(0);
    }

    // Represents the number of animations running simultaneously
    const [animsRunning, setAnimsRunning] = useState(0);

    const [fadeInFinishedFlag, setFadeInFinishedFlag] = useState(false);
    // Runs whenever the fade in effect finishes and the pulse in effect is about to begin
    useEffect(() => {
        if (animsRunning === 1) {
            // Only when there is one (the most recent one) active animation the pulseInEffect will trigger
            pulseInEffect();
        } else if (animsRunning > 1) {
            // If there are more than one active animations, the pulseInEffect will not trigger and the 
            // count of active animations will decrease by one
            setAnimsRunning(prevState => prevState - 1);
        }
    }, [fadeInFinishedFlag])

    const runAnimation = async () => {
        setAnimsRunning(prevState => prevState + 1);
        cardGetInEffect();
    }

    return (
        <div className="search-page">
            <SearchEngineContainer />
            {loading ?
                <div className="container">
                    <Loading />
                </div> :
                (results.length == 0 ?
                    <div className="container">
                        <h1>No results found for: "{keyword}"</h1>
                    </div> :
                    <div className="search-page-body">
                        <div className="movies-collection">
                            <div className="container">
                                <h1>Showing results for: "{keyword}"</h1>
                                <motion.div style={{ opacity: 0. }} animate={cardCollectionControls}>
                                    {results.slice(0, pageResults).map((result, index) => (
                                        <MovieCard
                                            title={result.title}
                                            releaseDate={result.release_date}
                                            imageUrl={createImageUrl(result.poster_path)}
                                            tmdb_id={result.id}
                                            vote={result.vote_average}
                                            key={index}
                                            cardControls={cardControls}
                                            imageControls={imageControls}
                                            textControls={textControls}
                                            custom={index}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                        <div className={'pagination-container'}>
                            <Pagination
                                numOfLinks={5}
                                page={currentPage}
                                total={totalResults / 2}
                                setPage={changePage}
                            />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default SearchPage;
