import { useContext } from 'react';
import authContext from '@/context/auth';
import { NavLink } from 'react-router-dom'

// icons
import Logo from '@/assets/icons/logo.svg';
import HomeIcon from '@/assets/icons/homeicon.svg';
import LogoutIcon from '@/assets/icons/logout.svg';
import bookmarkIcon from '@/assets/icons/bookmark.svg';

// style
import classes from './navigationBar.module.scss'

function Menu({ className }) {
    const { logout } = useContext(authContext)

    return (<menu className={`${className} ${classes['navigation-bar']}`}>
        <div className={classes['navigation-bar__logo']}>
            <img src={Logo} alt="logo" />
        </div>

        <div className={classes['navigation-bar__links']}>
            <NavLink to='/' className={({ isActive }) =>
                isActive ? classes['navigation-bar__link-icon-active'] : classes['navigation-bar__link-icon']
            } >
                <img src={HomeIcon} />
            </NavLink>

            <NavLink to='/bookmarks' className={({ isActive }) =>
                isActive ? classes['navigation-bar__link-icon-active'] : classes['navigation-bar__link-icon']
            } >
                <img src={bookmarkIcon} />
            </NavLink>
            {/* <a href="#" className={classes['navigation-bar__link-icon']}><img src={HomeIcon} /></a> */}
            {/* <a href="#" className={classes['navigation-bar__link-icon']}><img src={HomeIcon} /></a> */}
            {/* <a href="#" className={classes['navigation-bar__link-icon']}><img src={HomeIcon} /></a> */}
            <button onClick={logout} className={classes['navigation-bar__logout-button']}><img src={LogoutIcon} /></button>
        </div>

        <div className={classes['navigation-bar__user']}>
            <div className={classes['navigation-bar__user-avatar']}>
                <span>
                    A
                </span>
            </div>
        </div>
    </menu>);
}

export default Menu;