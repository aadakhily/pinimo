import classes from './searchHeader.module.scss'
import searchIcon from '@/assets/icons/search.svg'
import filterIcon from '@/assets/icons/filters.svg'

function SearchHeader() {
    return (
        <div className={classes['serach-header']}>
            <label htmlFor="search" className={classes['serach-header__input-label']}>
                <img src={searchIcon} alt="search-icon" />
                <input type="text" id='search' placeholder='Search some thing ...' className={classes['serach-header__input']} />
                <button className={classes['serach-header__filters']}><img src={filterIcon} alt="filterIcon" /></button>
            </label>

            <button className={classes['serach-header__new-post-btn']}>New Post</button>
        </div>
    );
}

export default SearchHeader;