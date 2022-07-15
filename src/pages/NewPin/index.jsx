import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authContext from '@/context/auth'

// utils
import fetchApi from '@/utils/fetchApi'
import convertBase64 from '@/utils/convertor'
import DefaultLayout from "@/layouts/default"

// icons
import uploadIcon from '@/assets/icons/upload.svg'
import deleteIcon from '@/assets/icons/delete.svg'

// style
import classes from './newPin.module.scss'

function NewPost() {
    const navigate = useNavigate()
    const [image, setImage] = useState();
    const { currentUser } = useContext(authContext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    async function onImageChange(event) {
        const file = event.target.files[0];
        if (!file) return

        const base64 = await convertBase64(file);
        setImage(base64)
    };

    function deleteImage(e) {
        e.stopPropagation()
        setImage('')
    }

    async function handelNewPinForm(formData) {
        try {
            const body = { ...formData, image, creator: currentUser }
            const { data } = await fetchApi.post('/pins', body)

            toast.success('Pin Created Successfully')
            navigate('/', { replace: true })

        } catch (error) {

        }
    }

    return (
        <DefaultLayout>
            <div className={classes['new-pin']}>
                <form onSubmit={handleSubmit(handelNewPinForm)} className={classes['new-pin__form']}>
                    <label className={classes['new-pin__img-input-label']}>
                        {
                            image ?
                                <div>
                                    <img src={image} alt="pin-image" />
                                    <button className={classes['new-pin__remove-img-btn']} onClick={deleteImage} ><img src={deleteIcon} alt="delete-icon" /></button>
                                </div>
                                :
                                <div className={classes['new-pin__img-placeholder']} >
                                    <img src={uploadIcon} alt="upload" />
                                    <p>Upload Image</p>
                                </div>
                        }

                        <input type="file" name="image" accept="image/*" id="pin-img" className={classes['new-pin__input-img']}  {...register('image', { required: true, onChange: onImageChange })} />

                        {errors.image && <span className={classes['text-error']}>Pin Image is required</span>}
                    </label>

                    <div className={classes['new-pin__form-body']}>
                        <div className={classes['new-pin__input-container']}>
                            <label htmlFor="pinTitle" className={classes['new-pin__label']}>Pin Title :</label>

                            <input type="text" id='pinTitle' className={classes['new-pin__input']} {...register('title', { required: true })} />

                            {errors.title && <span className={classes['text-error']}>Pin Title is required</span>}
                        </div>

                        <div className={classes['new-pin__input-container']}>
                            <label htmlFor="descriptionLink" className={classes['new-pin__label']}>Add a Description Link :</label>

                            <input type="text" id='descriptionLink' className={classes['new-pin__input']} {...register('descriptionLink')} />
                        </div>

                        <div className={classes['new-pin__input-container']}>
                            <label htmlFor="category" className={classes['new-pin__label']}>Select Category:</label>

                            <select id='category' className={classes['new-pin__input-select']} {...register('category')}>
                                <option value="other">Other...</option>
                                <option value="cars">Cars</option>
                                <option value="animals">Animals</option>
                                <option value="food">Food</option>
                                <option value="fitness">Fitness</option>
                                <option value="quotes">Quotes</option>
                                <option value="travel">Travel</option>
                                <option value="art">Art</option>
                                <option value="nature">Nature</option>
                                <option value="wallpaper">Wallpaper</option>
                                <option value="Websites">Websites</option>
                            </select>

                            {errors.category && <span className={classes['text-error']}>Category is required</span>}
                        </div>

                        <div className={classes['new-pin__input-container']}>
                            <label htmlFor="pinDescription" className={classes['new-pin__label']}>Description :</label>

                            <textarea type="text" id='pinDescription' className={classes['new-pin__input']} {...register('description', { required: true })} />
                            {errors.description && <span className={classes['text-error']}>Description is required</span>}
                        </div>

                        <button type="submit" className={classes['new-pin__submit']}>Create New Pin</button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}

export default NewPost;