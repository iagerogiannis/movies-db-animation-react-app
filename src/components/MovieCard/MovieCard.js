import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const MovieCard = (props) => {

    const {
        cardControls,
        custom,
        tmdb_id,
        imageControls,
        imageUrl,
        title,
        textControls,
        releaseDate,
      } = props;

    return (
        <motion.div animate={cardControls} whileHover={{scale: 1.1}} className='movie-card' custom={custom}>
            <Link to={`movie/${tmdb_id}`}>
                <div className='movie-card__details'>
                    <motion.div animate={imageControls} custom={custom}>
                        <img
                            src={imageUrl ? imageUrl : "/images/poster-default.jpg"}
                            // src={"/images/poster-default.jpg"}
                            alt="Movie Poster" />
                    </motion.div>
                    <div className='movie-card__details__info'>
                        <h1>{title}</h1>
                        <div className='movie-card__details__info__row'>
                            <p>Released:</p>
                            <motion.h2 animate={textControls} custom={custom}>{releaseDate}</motion.h2>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
)};

export default MovieCard;
