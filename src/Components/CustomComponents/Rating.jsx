import React from 'react';
import './Rating.css'
import Rating from 'react-rating';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

library.add(faStar,
    farStar)
const StarRating = ({ rating }) => {


    return (
        <Rating
            initialRating={rating}
            emptySymbol={<FontAwesomeIcon icon="far fa-star" />}
            fullSymbol={<FontAwesomeIcon icon="fas fa-star" />}
            readonly
        />
    );
};

export default StarRating;