import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import HomePage from '../pages/HomePage/HomePage';
import SearchPage from '../pages/SearchPage/SearchPage';
import MoviePage from '../pages/MoviePage/MoviePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';


const AppRouter = () => (
    <BrowserRouter>
        <div className="router">
            <Header />
            <Switch>
                <Route path="/" component={HomePage} exact={ true }/>
                <Route path="/search" component={SearchPage}/>
                <Route path="/movie/:id" component={MoviePage} exact={ true }/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);


export default AppRouter;
