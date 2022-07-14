import { useContext } from 'react';
import authContext from '@/context/auth';
import { NavLink } from 'react-router-dom'
import Logo from '@/assets/icons/logo.svg';
import HomeIcon from '@/assets/icons/homeicon.svg';
import LogoutIcon from '@/assets/icons/logout.svg';

import classes from './menu.module.scss'
function Menu({ className }) {
    const {logout} = useContext(authContext)
    
    return (<menu className={`${className} ${classes['menu']}`}>
        <div className={classes['meun__logo']}>
            <img src={Logo} alt="logo" />
        </div>

        <div className={classes['menu__links']}>
            <NavLink to='/'className={({ isActive }) =>
              isActive ? classes['menu__link-icon-active'] : classes['menu__link-icon']
            } ><img src={HomeIcon} /></NavLink>
            {/* <a href="#" className={classes['menu__link-icon']}><img src={HomeIcon} /></a> */}
            {/* <a href="#" className={classes['menu__link-icon']}><img src={HomeIcon} /></a> */}
            {/* <a href="#" className={classes['menu__link-icon']}><img src={HomeIcon} /></a> */}
            <button onClick={logout} className={classes['menu__logout-button']}><img src={LogoutIcon} /></button>
        </div>

        <div className={classes['menu__user']}>
            <div className={classes['menu__user-avatar']}>
                <span>
                    A
                </span>
            </div>
        </div>
    </menu>);
}

export default Menu;