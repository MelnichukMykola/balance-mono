import { QuestionCircleOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Menu } from 'antd'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Field from '../components/Field/Field'
import { AuthContext } from '../context/AuthContext'
import { fetchBankInfo } from '../store/trackingSlice'
import { setUserName, toggleUserLogged } from '../store/userSlice'
import './styles.scss'
import { signUpSchema } from './validationSchemas'
import { GoArrowLeft } from 'react-icons/go'

const items = [
  {
    label: 'Де знайти токен монобанка?',
    key: 'SubMenu',
    icon: <QuestionCircleOutlined />,
    children: [
      {
        type: 'group',
        label: (
          <span>
            Щоб отримати токен монобанка, Вам потрібно перейти
            <a
              className='link'
              href='https://api.monobank.ua/index.html'
              target='_blank'
            >
              {' '}
              за цим посиланням
            </a>{' '}
            і натиснути на QR-код aбо його відсканувати. Вас перекине в mono,
            вам потрібно погодитись і зайти знову на сайт, натиснути червону
            кнопку активувати і скопіювати Ваш токен-моно і вставити в поле
            зверху.
            <br />
            <span className='warning'>
              P.S. Не переживайте. Ваші дані в безпеці
            </span>
          </span>
        ),
      },
    ],
  },
]

const defaultValues = {
  userName: '',
  password: '',
}

export default function SignUp() {
  const { handleSignUp } = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async data => {
    dispatch(setUserName(data.userName))
    try {
      await handleSignUp(data)
      dispatch(fetchBankInfo(data.token))
      dispatch(toggleUserLogged(true))
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
    resolver: yupResolver(signUpSchema),
  })

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-container'>
        <div className='form-top'>
          <h1 className='form-logo'>Balance</h1>
          <button className='form-login'>
            <Link to='/sign-in'>Вхід</Link>
          </button>
        </div>
        <div className='form-content'>
          <h2 className='form-title'>Створити аккаунт</h2>
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
          <Field
            name='token'
            register={register}
            autoComplete='off'
            placeholder='Токен монобанка'
            error={Boolean(errors.token)}
            helperText={errors.token?.message}
            className='form-user_token'
          />
          <Menu mode='inline' items={items} className='form-info' />
          <Button disabled={isSubmitting} type='submit' className='form-btn'>
            Зареєструватися
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
