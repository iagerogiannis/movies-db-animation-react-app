import React, { useRef } from 'react';

import ReactTooltip from 'react-tooltip';
import { useHistory, withRouter } from 'react-router-dom';


const SearchEngine = () => {

    let history = useHistory();

    let inputRef = useRef(null);

    const handleOnSearch = (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            const redirectPath = `/search?keyword=${keyword}`;
            history.push(redirectPath);
            e.target.elements.keyword.value = "";
        } else {
            ReactTooltip.show(inputRef);
            setTimeout(() => {ReactTooltip.hide(inputRef);}, 2000 );
        }
    }

    const handleOnType = (e) => {
        ReactTooltip.hide(inputRef);
    }

    return (
        <div>
            <form onSubmit={handleOnSearch} className='search-engine'>
                <input
                    ref={ref => inputRef = ref}
                    name='keyword'
                    placeholder="Search Movie"
                    className='search-engine__input'
                    data-tip='Insert parameter for Search'
                    data-for="empty search"
                    onChange={handleOnType}
                    />
                <button className='search-engine__button'>Search</button>
            </form>

            <ReactTooltip
                id="empty search"
                type="warning"
                effect="solid"
                place="bottom"
                event="custom"
                backgroundColor='#f75220'
                />

        </div>
    )

}

export default withRouter(SearchEngine);
