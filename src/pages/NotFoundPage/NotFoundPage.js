import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage = () => (
    <div className='container'>
        <div className='page-not-found'>
            <h1>Error 404: Page not Found!</h1>
            <Link className='page-not-found__link' to='/'>Go Home!</Link>
        </div>
    </div>
);

export default NotFoundPage;
