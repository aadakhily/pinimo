import classes from './menu.module.scss'
import HomeIcon from '../../assets/icons/homeicon.svg';
import Logo from '../../assets/icons/logo.svg';

function Menu({ className }) {
    return (<menu className={`${className} ${classes['menu']}`}>
        <div className={classes['meun__logo']}>
            <img src={Logo} alt="logo" />
        </div>

        <div className={classes['menu__links']}>
            <a href="" className={classes['menu__link-icon']}><img src={HomeIcon} /></a>
            <a href="" className={classes['menu__link-icon']}><img src={HomeIcon} /></a>
            <a href="" className={classes['menu__link-icon']}><img src={HomeIcon} /></a>
            <a href="" className={classes['menu__link-icon']}><img src={HomeIcon} /></a>
            <a href="" className={classes['menu__link-icon']}><img src={HomeIcon} /></a>
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