import classes from './post.module.scss'
function Post({ item }) {
    return (<div className={classes['post']}>
        <div className={classes['post__img-container']}>
            <img src={`https://picsum.photos/id/${item + 20}/200${item % 2 ? '/300' : ''}`} loading="lazy" alt="post" />
        </div>
        <div className={classes['post__info']}>
            <div className={classes['post__avatar']}>A</div>
            <div className={classes['post__user-info']}>
                <p className={classes['post__title']}>This is title</p>
                <span className={classes['post__user-name']}>amit</span>
            </div>
        </div>
    </div>);
}

export default Post;