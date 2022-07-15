import { Link } from 'react-router-dom'

import classes from './pin.module.scss'

function Pin({ pin }) {
    return (
        <Link to={`/pin/${pin.id}`} className={classes['pin']}>
            <div className={classes['pin__img-container']}>
                <img src={pin.image} loading="lazy" alt="pin" />
            </div>
            <div className={classes['pin__info']}>
                <div className={classes['pin__avatar']}>{`${pin?.creator?.firstName[0]}${pin?.creator?.lastName[0]}`}</div>
                <div className={classes['pin__user-info']}>
                    <p className={classes['pin__title']}>{pin.title}</p>
                    
                    <span  className={classes['pin__user-email']}>{pin?.creator?.email}</span>
                </div>
            </div>
        </Link>
    );
}

export default Pin;