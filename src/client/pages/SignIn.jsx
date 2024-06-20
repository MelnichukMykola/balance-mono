import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Field from '../components/Field/Field'
import { AuthContext } from '../context/AuthContext'
import { fetchBankInfo, setStatusLoading } from '../store/trackingSlice'
import { setUserName } from '../store/userSlice'
import './styles.scss'
import { signInSchema } from './validationSchemas'
import { GoArrowLeft } from 'react-icons/go'

const defaultValues = {
  userName: '',
  password: '',
}

export default function SignIn() {
  const { handleSignIn, handleFetchProtected } = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async data => {
    dispatch(setUserName(data.userName))
    try {
      await handleSignIn(data)
      const token = await handleFetchProtected(data.userName)
      dispatch(fetchBankInfo(token))
      navigate('/home')
    } catch (error) {
      console.error('Authentication failed', error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(signInSchema),
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <div className='form-container'>
        <div className='form-top'>
          <h1 className='form-logo'>Balance</h1>
          <button className='form-signup'>
            <Link to='/sign-up'>Реєстрація</Link>
          </button>
        </div>
        <div className='form-content form-content_signin'>
          <h2 className='form-title'>Увійти в обліковий запис</h2>
          <Field
            name='userName'
            register={register}
            autoComplete='off'
            placeholder="Ім'я користувача"
            error={Boolean(errors.userName)}
            helperText={errors.userName?.message}
            className='form-user_name'
          />
          <Field
            name='password'
            register={register}
            autoComplete='off'
            placeholder='Пароль'
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            className='form-user_password'
          />
          <Button disabled={isSubmitting} type='submit' className='form-btn'>
            Увійти
          </Button>
        </div>
      </div>
        <Link to='/home' className='form-to-home'>
          <GoArrowLeft size='26' />
          <p>На головну сторінку</p>
        </Link>
    </form>
  )
}
