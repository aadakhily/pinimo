import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './pinPage.module.scss'
import DefaultLayout from '../../layouts/default'
import fetchApi from '../../utils/fetchApi';

import downloadIcon from '@/assets/icons/download.svg'
import PinsList from '@/components/PinsList';
import Comments from '../../components/Comments';
function PinPage() {
    const { pinId } = useParams()
    const [pin, setPin] = useState({})
    const [otherPins, setOtherPins] = useState([])

    async function fetchPin() {
        try {
            const { data } = await fetchApi.get(`/pins/${pinId}`)
            
            setPin(data)

            fetchOtherPins(data.category)
        } catch (error) {

        }
    }

    async function fetchOtherPins(category) {
        try {
            const { data } = await fetchApi.get('/pins', {
                params: { category: category }
            })

            setOtherPins(data)

            console.log('other', otherPin);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchPin()
    }, [])

    return (
        <DefaultLayout>
            <div className={classes['pin-page']}>
                <div className={classes['pin-info']}>
                    <div className={classes['pin-info__img-container']}>
                        <img src={pin.image} alt={pin.title} />
                    </div>

                    <div className={classes['pin-info__details']}>
                        <div className={classes['pin-info__overview']}>
                            <a download={`${pin.title}.jpg`} href={pin.image} className={classes['pin-info__download']}>
                                <img src={downloadIcon} alt="download-icon" />
                            </a>

                            <span className={classes['pin-info__overview-text']}>{`'${pin.title}' by ${pin?.creator?.firstName} ${pin?.creator?.lastName}`}</span>
                        </div>

                        <h1 className={classes['pin-info__title']}>{pin.title}</h1>
                        <p className={classes['pin-info__description']}>{pin.description}</p>
                        {pin.descriptionLink && <span className={classes['pin-info__description-link']}>{pin.descriptionLink}</span>}

                        <div className={classes['pin-info__user']}>
                            <div className={classes['pin-info__avatar']}>{`${pin?.creator?.firstName[0]}${pin?.creator?.lastName[0]}`}</div>
                            <div className={classes['pin-info__user-info']}>
                                <p className={classes['pin-info__user-name']}>{`${pin?.creator?.firstName} ${pin?.creator?.lastName}`}</p>
                                <span className={classes['pin-info__user-email']}>{pin?.creator?.email}</span>
                            </div>
                        </div>

                        <Comments pinId={pinId} />
                    </div>
                </div>

                {
                    otherPins &&
                    <div className={classes['other-pins']}>
                        <h3 className={classes['other-pins__title']}>See more Pins</h3>
                        <PinsList pins={otherPins} />
                    </div>
                }
            </div>
        </DefaultLayout>
    );
}

export default PinPage;