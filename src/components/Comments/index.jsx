import { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import fetchApi from '@/utils/fetchApi';
import classes from './comments.module.scss'
import authContext from '../../context/auth'

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

            console.log('comments', data);
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

        } catch (error) {

        }
    }
    return (<div className={classes['comments']}>
        <h5>Comments</h5>
        {
            commentsData?.map(comment => {
                return (
                    <div key={comment.id} className={classes['comments__user']}>
                        <div className={classes['comments__avatar']}>{`${comment?.creator?.firstName[0]}${comment?.creator?.lastName[0]}`}</div>
                        <div className={classes['comments__user-info']}>
                            <span className={classes['comments__user-name']}>{`${comment?.creator?.firstName} ${comment?.creator?.lastName}`}</span>
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