import Pin from '../Pin'
import Loading from '../Loading'
import classes from './pinsList.module.scss'
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
};

const PostList = ({ pins, loading }) => (
    <div className={classes['pins-list-conatainer']}>
        {
            loading ?
                <div className={classes['loading']}>
                    <Loading />
                </div>
                :
                <Masonry className={classes['pins-list']} breakpointCols={breakpointColumnsObj}>
                    {
                        pins?.map((pin) => <Pin key={pin.id} pin={pin} />)
                    }
                </Masonry>
        }

    </div>
);

export default PostList;