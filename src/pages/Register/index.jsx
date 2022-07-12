import { useForm } from 'react-hook-form'
import axiosInstanse from '../../utils/axiosInstanse'
import classes from './register.module.scss'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { REGEX_PATERN_FOR_EMAIL } from '../../utils/validation'

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()


    async function registerHandler(formData) {
        try {
            const { data } = await axiosInstanse.post('/register', formData)
            toast.success(`Welcome ${data.user.firstName} ${data.user.lastName}`)
            navigate('/', { replace: true })
        } catch (error) {
            toast.error(error.response.data)
            console.error(error)
        }
    }

    return (
        <div className={classes['register-page']}>
            <form onSubmit={handleSubmit(registerHandler)} className={classes['register-form']}>

                <h1 className={classes['register-form__title']}>Create Pinimo Account</h1>

                <div className={classes['register-form__input-container']}>
                    <label htmlFor="firstName" className={classes['register-form__label']}>First Name :</label>

                    <input type="text" id='firstName' className={classes['register-form__input']} {...register('firstName', { required: true })} />

                    {errors.firstName && <span className={classes['text-error']}>email is required</span>}
                </div>

                <div className={classes['register-form__input-container']}>
                    <label htmlFor="lastName" className={classes['register-form__label']}>Last Name :</label>

                    <input type="text" id='lastName' className={classes['register-form__input']} {...register('lastName', { required: true })} />

                    {errors.lastName && <span className={classes['text-error']}>email is required</span>}
                </div>

                <div className={classes['register-form__input-container']}>
                    <label htmlFor="email" className={classes['register-form__label']}>Email :</label>

                    <input type="email" id='email' className={classes['register-form__input']} {...register('email', { required: true, pattern: REGEX_PATERN_FOR_EMAIL })} />

                    {errors.email && <span className={classes['text-error']}>email is required</span>}
                </div>

                <div className={classes['register-form__input-container']}>
                    <label htmlFor="password" className={classes['register-form__label']}>Password :</label>

                    <input type="password" id="password" className={classes['register-form__input']} {...register('password', { required: true })} />

                    {errors.password && <span className={classes['text-error']}>Password is required</span>}
                </div>

                <button type="submit" className={classes['register-form__submit']}>Create Account</button>

            </form>
        </div>
    )
}

export default Register