import axios from 'axios';


const apiKey = "6de482bc8c5768aa3648618b9c3cc98a";


export const createSearchUrl = (keyword, page = 1) => (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}&page=${page}`);

export const createMovieUrl = (tmdb_id) => (`https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${apiKey}`);

export const createImageUrl = (path, sizeIndex = 2, isBackdrop = false) => {
    const backdropSizes = ["w300", "w780", "w1280", "original"];
    const posterSizes = ["w92", "w154", "w185", "w342", "w500", "w780", "original"];
    const size = isBackdrop ? backdropSizes[sizeIndex] : posterSizes[sizeIndex];
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}

export const requestSearch = async (keyword, page = 1) => {
    const response = await axios.get(createSearchUrl(keyword, page));
    const totalPages = response.data.total_pages;
    const results = response.data.results;
    const totalResults = response.data.total_results;
    return {results, totalPages, totalResults};
};

export const requestMovie = async (movie_id) => (await axios.get(createMovieUrl(movie_id)));

export const requestPopular = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`);
    const results = response.data.results;
    return results;
};
