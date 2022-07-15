import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import fetchApi from '@/utils/fetchApi'
import { REGEX_PATERN_FOR_EMAIL } from '@/utils/validation'

import classes from './login.module.scss'

import authContext from '@/context/auth';


function Login() {
  const navigate = useNavigate()
  const { login } = useContext(authContext)
  const { register, handleSubmit, formState: { errors } } = useForm()

  async function loginHandler(formData) {
    try {
      const { data } = await fetchApi.post('/login', formData);
      login(data)
      toast.success(`Welcome ${data.user.firstName} ${data.user.lastName}`)
      navigate('/', { replace: true })
    } catch (error) {
      toast.error(error.response.data)
      console.error(error)
    }
  }

  return (
    <div className={classes['login-page']}>
      <form onSubmit={handleSubmit(loginHandler)} className={classes['login-form']}>

        <h1 className={classes['login-form__title']}>Login To Pinimo</h1>

        <div className={classes['login-form__input-container']}>
          <label htmlFor="email" className={classes['login-form__label']}>Email :</label>

          <input type="email" id='email' className={classes['login-form__input']} {...register('email', { required: true, pattern: REGEX_PATERN_FOR_EMAIL })} />

          {errors.email && <span className={classes['text-error']}>Email is required</span>}
        </div>

        <div className={classes['login-form__input-container']}>
          <label htmlFor="email" className={classes['login-form__label']}>Password :</label>

          <input type="password" id="password" className={classes['login-form__input']} {...register('password', { required: true })} />

          {errors.password && <span className={classes['text-error']}>Password is required</span>}
        </div>

        <button type="submit" className={classes['login-form__submit']}>Login</button>

        <Link to='/register' className={classes['login-form__signup-link']}>or Register</Link>
      </form>
    </div>
  )
}

export default Login