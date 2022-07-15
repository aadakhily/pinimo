import { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import authContext from '../../context/auth'

// util
import fetchApi from '@/utils/fetchApi';

// style
import classes from './comments.module.scss'

function Comments({ pinId }) {
    const [commentsData, setCommentsData] = useState([])
    const { register, handleSubmit } = useForm()
    const { currentUser } = useContext(authContext)


    useEffect(() => {
        fetchComments()
    }, [])

    async function fetchComments() {
        try {
            const { data } = await fetchApi.get('/comments', {
                params: {
                    pinId
                }
            })

            setCommentsData(data)
        } catch (error) {

        }
    }

    async function newComment(formData) {
        try {
            const body = {
                pinId,
                creator: currentUser,
                ...formData,
            }

            const { data } = await fetchApi.post('/comments', body)
            setCommentsData((oldComments) =>([...oldComments, data]))
        } catch (error) {

        }
    }

    return (<div className={classes['comments']}>
        <h5>Comments</h5>
        {
            commentsData?.map(comment => {
                return (
                    <div key={comment.id} className={classes['comments__user']}>
                        <Link to={`/user/${comment?.creator?.id}`} className={classes['comments__avatar']}>{`${comment?.creator?.firstName[0]}${comment?.creator?.lastName[0]}`}</Link>
                        
                        <div className={classes['comments__user-info']}>
                            <Link to={`/user/${comment?.creator?.id}`} className={classes['comments__user-name']}>{`${comment?.creator?.firstName} ${comment?.creator?.lastName}`}</Link>
                            <p className={classes['comments__comment-text']}>{comment.commentText}</p>
                        </div>
                    </div>
                )
            })
        }

        <form className={classes['comments__new-comment']} onSubmit={handleSubmit(newComment)}>
            <input type="text" placeholder='Write a Comment' className={classes['comments__input']} {...register('commentText')} />
            <button type="submit" className={classes['comments__submit']}>send</button>
        </form>
    </div>);
}

export default Comments;