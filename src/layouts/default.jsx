import Menu from "../components/Menu";
import classes from './defaultLayout.module.scss'

function DefaultLayout({ children }) {
    return (
        <div className={classes['layout']}>
            <Menu className={classes['layout__menu']} />

            <div className={classes['page']}>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;