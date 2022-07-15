import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './user.module.scss'
import DefaultLayout from "../../layouts/default";
import PinsList from '../../components/PinsList'
import fetchApi from '../../utils/fetchApi';

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
                        {/* <img src={userPins[2].image} alt="" /> */}
                    </div>

                    <div className={classes['user__avatar']}>
                        {/* <img src={userPins[7].image} alt="" /> */}
                    </div>

                    <h4 className={classes['user__name']}>{`${user?.firstName} ${user?.lastName}`}</h4>
                    <span className={classes['user__email']}>{user?.email}</span>
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