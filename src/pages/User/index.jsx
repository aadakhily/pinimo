import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// utils
import fetchApi from '@/utils/fetchApi';

// components
import PinsList from '@/components/PinsList'
import DefaultLayout from "@/layouts/default";

// style
import classes from './user.module.scss'

function UserPage() {
    const { userId } = useParams()
    const [user, setUser] = useState();
    const [userPins, setUserPins] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchUser() {
        try {
            const { data } = await fetchApi.get(`/users/${userId}`)
            setUser(data)
        } catch (error) {

        }
    }


    async function fetchUserPins() {
        try {
            setLoading(true)
            const { data } = await fetchApi.get('/pins', {
                params: {
                    'creator.id': userId
                }
            })

            setUserPins(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchUserPins()
    }, [userId])

    return (
        <DefaultLayout>
            <div className={classes['user-page']}>
                <div className={classes['user']}>
                    <div className={classes['user__background']}>
                        {user?.background && <img src={user?.background} alt="background" />}
                    </div>

                    <div className={classes['user__avatar']}>
                        {user?.avatar && <img src={user?.avatar} alt="avatar" />}
                    </div>

                    <h4 className={classes['user__name']}>{`${user?.firstName} ${user?.lastName}`}</h4>
                    <span className={classes['user__email']}>{user?.email}</span>
                    <p className={classes['user__bio']}>{ user?.bio }</p>
                </div>

                <div className={classes['user__pins']}>
                    <h3>{`${user?.firstName} ${user?.lastName}`} Pins</h3>
                    <PinsList pins={userPins} loading={loading} />
                </div>
            </div>
        </DefaultLayout>
    );
}

export default UserPage;