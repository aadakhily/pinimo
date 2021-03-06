import { useState, useEffect , useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import authContext from '@/context/auth'
import { toast } from 'react-toastify'
// utils
import fetchApi from '@/utils/fetchApi';

//icons
import shareIcon from '@/assets/icons/share.svg'
import downloadIcon from '@/assets/icons/download.svg'
import bookmarkIcon from '@/assets/icons/addbookmark.svg'

// components
import DefaultLayout from '@/layouts/default'
import PinsList from '@/components/PinsList';
import Comments from '@/components/Comments';

//style
import classes from './pinPage.module.scss'

function PinPage() {
    const { pinId } = useParams()
    const [pin, setPin] = useState({})
    const { currentUser } = useContext(authContext)
    const [loading, setLoading] = useState(false)
    const [otherPins, setOtherPins] = useState([])

    useEffect(() => {
        fetchPin()
    }, [pinId])

    async function fetchPin() {
        try {
            const { data } = await fetchApi.get(`/pins/${pinId}`)

            setPin(data)

            fetchOtherPins(data.category)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchOtherPins(category) {
        try {
            setLoading(true)
            const { data } = await fetchApi.get('/pins', {
                params: { category: category }
            })

            setOtherPins(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function sharePin() {
        try {
            const shareData = {
                title: pin.title,

                text: pin?.description,

                url: window?.location?.href
            }

            await navigator.share(shareData)

        } catch (error) {
            console.error(error);
        }
    }

    async function bookmarkPin(){
        try {
            const body = {
                owner:currentUser?.id,
                ...pin
            }

            const { data } = await fetchApi.post('/bookmarks',body)
            toast.success('Pin Bookmarked Successfully')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <DefaultLayout>
            <div className={classes['pin-page']}>
                <div className={classes['pin-info']}>
                    <div className={classes['pin-info__img-container']}>
                        <img src={pin.image} alt={pin.title} />
                    </div>

                    <div className={classes['pin-info__details']}>
                        <div className={classes['pin-info__overview']}>
                            <div className={classes['pin-info__iteractions']}>
                                <a download={`${pin.title}.jpg`} href={pin.image} className={classes['pin-info__interaction-button']}>
                                    <img src={downloadIcon} alt="download-icon" />
                                </a>

                                <button onClick={sharePin} className={classes['pin-info__interaction-button']}><img src={shareIcon} alt="share-icon" /></button>

                                <button onClick={bookmarkPin} className={classes['pin-info__interaction-button']}><img src={bookmarkIcon} alt="bookmark-icon" /></button>
                            </div>

                            <span className={classes['pin-info__overview-text']}>{`'${pin.title}' by ${pin?.creator?.firstName} ${pin?.creator?.lastName}`}</span>
                        </div>

                        <h1 className={classes['pin-info__title']}>{pin.title}</h1>
                        <p className={classes['pin-info__description']}>{pin.description}</p>
                        {pin.descriptionLink && <span className={classes['pin-info__description-link']}>{pin.descriptionLink}</span>}

                        <Link to={`/user/${pin?.creator?.id}`} className={classes['pin-info__user']}>
                            <div className={classes['pin-info__avatar']}>{`${pin?.creator?.firstName[0]}${pin?.creator?.lastName[0]}`}</div>
                            <div className={classes['pin-info__user-info']}>
                                <p className={classes['pin-info__user-name']}>{`${pin?.creator?.firstName} ${pin?.creator?.lastName}`}</p>
                                <span className={classes['pin-info__user-email']}>{pin?.creator?.email}</span>
                            </div>
                        </Link>

                        <Comments pinId={pinId} />
                    </div>
                </div>

                {
                    otherPins &&
                    <div className={classes['other-pins']}>
                        <h3 className={classes['other-pins__title']}>See More Pins</h3>
                        <PinsList pins={otherPins} loading={loading} />
                    </div>
                }
            </div>
        </DefaultLayout>
    );
}

export default PinPage;