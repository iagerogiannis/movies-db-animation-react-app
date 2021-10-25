import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
    <div className='header'>
        <div className='container'>
            <Link className='header__link' to='/'>
                <h1 className='header__title'>Movies DB Animation App</h1>
                <h2 className='header__subtitle'>Movies DB Animation App Subtitle</h2>
            </Link>
        </div>
    </div>
);

export default Header;
