import classes from './searchHeader.module.scss'
import searchIcon from '@/assets/icons/search.svg'
import filterIcon from '@/assets/icons/filters.svg'
import { Link } from 'react-router-dom';

function SearchHeader({ onSearch , value }) {
    function inputChangeHandler(e){
        onSearch(e.target.value)
    }

    return (
        <div className={classes['serach-header']}>
            <label htmlFor="search" className={classes['serach-header__input-label']}>
                <img src={searchIcon} alt="search-icon" />
                <input type="text" id='search' value={value} onChange={inputChangeHandler} placeholder='Search some thing ...' className={classes['serach-header__input']} />
                <button className={classes['serach-header__filters']}><img src={filterIcon} alt="filterIcon" /></button>
            </label>

            <Link to='/new-pin' className={classes['serach-header__new-post-btn']}>New Pin</Link>
        </div>
    );
}

export default SearchHeader;