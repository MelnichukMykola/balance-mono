import { SnackbarProvider } from 'notistack'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import './App.css'
import { countPeriod, separateArraysForChart } from './constants'
import { AuthContext } from './context/AuthContext.jsx'
import ChartsPage from './pages/ChartsPage'
import Home from './pages/Home'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import TransactionsPage from './pages/TransactionsPage'
import { selectStore, selectTracking, selectUser } from './store/selectors.js'
import {
  defineLabels,
  rewriteTrackingStore,
  setDailyExpenses,
  setDailyIncome,
  setStatusLoading,
} from './store/trackingSlice.js'
import { rewriteUserStore } from './store/userSlice.js'

function App() {
  const { transactions, statusLoading, dataLoaded, labels } =
    useSelector(selectTracking)
  const { isUserLogged, userName } = useSelector(selectUser)
  const store = useSelector(selectStore)
  const {
    handleSendingData,
    handleFetchAppDataProtected,
  } = useContext(AuthContext)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(defineLabels(countPeriod()))
  }, [])

  useEffect(() => {
    dataLoaded && handleSendingData({ userName, store })
    console.log('data', dataLoaded)
  }, [dataLoaded])

  useEffect(() => {
    console.log('user', isUserLogged)
  }, [isUserLogged])

  const getAppData = async userName => {
    const store = await handleFetchAppDataProtected(userName)
    return store
  }

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      dispatch(setStatusLoading('loading'))
      const userName = localStorage.getItem('userName')
      getAppData(userName).then(res => {
        dispatch(rewriteTrackingStore(res.tracking))
        dispatch(rewriteUserStore(res.user))
      })
    }
  }, [dispatch])
  

  useEffect(() => {
    if (isUserLogged) {
      dispatch(
        setDailyExpenses(
          separateArraysForChart(transactions, labels, 'expenses')
        )
      )
      dispatch(
        setDailyIncome(separateArraysForChart(transactions, labels, 'incomes'))
      )
    }
  }, [transactions, dataLoaded, labels])

  if (statusLoading === 'idle') {
    return (
      <div className='app'>
        <SnackbarProvider />
        <BrowserRouter>
          <Routes>
            <Route path='home' element={<Home />} />
            <Route path='transactions' element={<TransactionsPage />} />
            <Route path='charts' element={<ChartsPage />} />
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='*' element={<Navigate to={'home'} />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  } else if (statusLoading === 'loading') {
    return (
      <div className='loader-icon'>
        <PacmanLoader color='#4c6663' />
      </div>
    )
  }
}

export default App