import { useState, useEffect, useContext  } from 'react'
import DefualtLayout from '@/layouts/default'
import authContext from '@/context/auth'
import fetchApi from '@/utils/fetchApi';

import PinsList from '@/components/PinsList'

import classes from './bookmark.module.scss'

function BookmarkPage() {
    const { currentUser } = useContext(authContext)
    const [bookmarkedPins, setBookmarkedPins] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchBookmarks()
    }, [])

    async function fetchBookmarks() {
        try {
            setLoading(true)

            const { data } = await fetchApi.get('/bookmarks', {
                params: {
                    owner: currentUser.id
                }
            })

            setBookmarkedPins(data)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }


    return (
        <DefualtLayout>
            <div className={classes['bookmarks']}>
                <h2 className={classes['bookmarks__title']}>Your Bookmarked Pins</h2>
                <PinsList pins={bookmarkedPins} loading={loading} />
            </div>
        </DefualtLayout>
    );
}

export default BookmarkPage;