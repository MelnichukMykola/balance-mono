import axios from 'axios'
import { useCycle } from 'framer-motion'
import { createContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import config from '../config'
import inMemoryJWT from '../services/inMemoryJWT'
import { handleFakeData } from '../store/trackingSlice'
import { toggleUserLogged } from '../store/userSlice'
import showErrorMessage from '../utils/showErrorMessage'

export const AuthClient = axios.create({
  baseURL: `${import.meta.env.VITE_CLIENT_URL_DEV}/auth`,
  withCredentials: true,
})

const ResourceClient = axios.create({
  baseURL: `${import.meta.env.VITE_CLIENT_URL_DEV}/resource`,
})

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [isOpen, toggleOpen] = useCycle(false, true)

  const handleSendingData = async data => {
    try {
      await ResourceClient.post('/app-data', data)
    } catch (error) {
      showErrorMessage(error)
      throw error
    }
  }


  const handleSignIn = async data => {
    console.log('sign-in')
    // dispatch(setStatusLoading('loading'))
    try {
      const res = await AuthClient.post('/sign-in', data)
      const { accessToken, accessTokenExpiration } = res.data

      inMemoryJWT.setToken(accessToken, accessTokenExpiration)
      dispatch(toggleUserLogged(true))
    } catch (error) {
      showErrorMessage(error)
      throw error
    }
  }

  const handleLogOut = async () => {
    console.log('log-out')
    localStorage.removeItem('userName')
    dispatch(toggleUserLogged(false))
    dispatch(handleFakeData())
    try {
      await AuthClient.post('/logout')
        .then(() => {
          inMemoryJWT.deleteToken()
        })
        .catch(showErrorMessage)
    } catch (error) {}
  }

  const handleSignUp = data => {
    AuthClient.post('/sign-up', data)
      .then(res => {
        if (res.data) {
          const { accessToken, accessTokenExpiration } = res.data
          inMemoryJWT.setToken(accessToken, accessTokenExpiration)
          dispatch(toggleUserLogged(true))
        } else {
          console.error('Response data is undefined or null')
        }
      })
      .catch(error => {
        console.error('Error in sign-up request:', error)
        showErrorMessage(error)
      })
  }

  const handleFetchProtected = async userName => {
    localStorage.setItem('userName', userName)
    try {
      const response = await ResourceClient.get('/protected', {
        params: {
          userName,
        },
      })
      const token = response.data
      return token
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const handleFetchAppDataProtected = async userName => {
    try {
      const response = await ResourceClient.get(
        '/protected_app-data',
        {
          params: {
            userName,
          },
        }
      )
      const appData = response.data
      return appData
    } catch (error) {
      showErrorMessage(error)
    }
  }

  useEffect(() => {
    AuthClient.post('/refresh')
      .then(res => {
        const { accessToken, accessTokenExpiration } = res.data
        inMemoryJWT.setToken(accessToken, accessTokenExpiration)

        dispatch(toggleUserLogged(true))
      })
      .catch(() => {
        // dispatch(toggleUserLogged(false))
      })
  })

  useEffect(() => {
    const handlePersistedLogOut = event => {
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken()
        dispatch(toggleUserLogged(false))
      }
    }

    window.addEventListener('storage', handlePersistedLogOut)

    return () => {
      window.removeEventListener('storage', handlePersistedLogOut)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        toggleOpen,
        handleLogOut,
        handleSignIn,
        handleSignUp,
        handleFetchProtected,
        handleSendingData,
        handleFetchAppDataProtected
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
