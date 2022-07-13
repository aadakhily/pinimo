import Post from '../Post'

import classes from './postList.module.scss'

import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
};

const PostList = () => (
    <Masonry className={classes['post-list']} breakpointCols={breakpointColumnsObj}>
        {[...Array(45).keys()].map((pin) => <Post key={pin} item={pin}  />)}
    </Masonry>
);

export default PostList;