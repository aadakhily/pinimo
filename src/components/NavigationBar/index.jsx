import { useContext } from 'react';
import authContext from '@/context/auth';
import { NavLink } from 'react-router-dom'

// icons
import Logo from '@/assets/icons/logo.svg';
import HomeIcon from '@/assets/icons/homeicon.svg';
import LogoutIcon from '@/assets/icons/logout.svg';
import bookmarkIcon from '@/assets/icons/bookmark.svg';
import settingIcon from '@/assets/icons/setting.svg';

// style
import classes from './navigationBar.module.scss'

function NavigationBar({ className }) {
    const { logout } = useContext(authContext)

    return (
        <menu className={`${className} ${classes['navigation-bar']}`}>
            <div className={classes['navigation-bar__logo']}>
                <img src={Logo} alt="logo" />
            </div>

            <div className={classes['navigation-bar__links']}>
                <NavLink to='/' className={({ isActive }) =>
                    isActive ? classes['navigation-bar__link-icon-active'] : classes['navigation-bar__link-icon']
                } >
                    <img src={HomeIcon} alt='home-icon' />
                </NavLink>

                <NavLink to='/bookmarks' className={({ isActive }) =>
                    isActive ? classes['navigation-bar__link-icon-active'] : classes['navigation-bar__link-icon']
                } >
                    <img src={bookmarkIcon} alt='bookmark-icon' />
                </NavLink>

                <NavLink to='/setting' className={({ isActive }) =>
                    isActive ? classes['navigation-bar__link-icon-active'] : classes['navigation-bar__link-icon']
                } >
                    <img src={settingIcon} alt='setting-icon' />
                </NavLink>
            </div>

            <button onClick={logout} className={classes['navigation-bar__logout-button']}><img src={LogoutIcon} /></button>
        </menu>
    );
}

export default NavigationBar;