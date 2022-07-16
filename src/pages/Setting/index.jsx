import { useState, useEffect, useContext } from 'react'
import authContext from '@/context/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// utils
import fetchApi from '@/utils/fetchApi';
import convertBase64 from '@/utils/convertor'

// components
import DefultLayout from '@/layouts/default'

import cameraIcon from '@/assets/icons/camera.svg'

// style
import classes from './setting.module.scss'

function Setting() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [avatar, setAvatar] = useState()
    const { register, handleSubmit } = useForm()
    const [background, setbackground] = useState()
    const { currentUser } = useContext(authContext);

    useEffect(() => {
        fetchUser()
    }, [currentUser.id])

    async function onAvatarImageChange(event) {
        const file = event.target.files[0];
        if (!file) return

        const base64 = await convertBase64(file);
        setAvatar(base64)
    };

    async function onBackgroundImageChange(event) {
        const file = event.target.files[0];
        if (!file) return

        const base64 = await convertBase64(file);
        setbackground(base64)
    };


    async function fetchUser() {
        try {
            const { data } = await fetchApi.get('/users', {
                params: {
                    id: currentUser.id
                }
            })
            setUser(data[0])
        } catch (error) {
            console.error(error);
        }
    }

    async function editUserInfo(formData) {
        try {
            // remove keies that value in empty string
            formData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v != ''));

            const body = {
                ...formData, avatar, background
            }

            await fetchApi.patch(`/users/${user.id}`, body)

            toast.success('Your Profile Edited Successfully')
            
            navigate(`/user/${user.id}`)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DefultLayout>
            <form onSubmit={handleSubmit(editUserInfo)}>
                <div className={classes['user']}>
                    <label htmlFor='background' className={classes['user__background']}>
                        <input type="file" name="avatar" accept="image/*" id="background" onChange={onBackgroundImageChange} />
                        {
                            background ?
                                <div>
                                    <img src={background} alt="avatar" className={classes['user__background-image']} />
                                </div>
                                :
                                <img src={cameraIcon} alt="upload" className={classes['user__background-upload-icon']} />
                        }
                    </label>

                    <label htmlFor='avatar' className={classes['user__avatar']}>
                        <input type="file" name="avatar" accept="image/*" id="avatar" onChange={onAvatarImageChange} />

                        {
                            avatar ?
                                <div>
                                    <img src={avatar} alt="avatar" className={classes['user__avatar-image']} />
                                </div>
                                :
                                <img src={cameraIcon} alt="upload" className={classes['user__avatar-upload-icon']} />
                        }
                    </label>

                    <h4 className={classes['user__name']}>{`${user?.firstName} ${user?.lastName}`}</h4>
                    <span className={classes['user__email']}>{user?.email}</span>
                </div>

                <div className={classes['edit-form']}>

                    <div className={classes['edit-form__input-container']}>
                        <label htmlFor="firstName" className={classes['edit-form__label']}>First Name :</label>

                        <input type="text" id='firstName' className={classes['edit-form__input']} {...register('firstName')} />
                    </div>

                    <div className={classes['edit-form__input-container']}>
                        <label htmlFor="lastName" className={classes['edit-form__label']}>Last Name :</label>

                        <input type="text" id='lastName' className={classes['edit-form__input']} {...register('lastName')} />

                    </div>

                    <div className={classes['edit-form__input-container']}>
                        <label htmlFor="email" className={classes['edit-form__label']}>bio :</label>

                        <textarea type="email" id='email' className={classes['edit-form__input']} {...register('bio')} />
                    </div>

                    <button type="submit" className={classes['edit-form__submit']}>Edit Info</button>
                </div>
            </form>
        </DefultLayout>
    );
}

export default Setting;