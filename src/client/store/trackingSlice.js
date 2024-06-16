import { createSlice } from '@reduxjs/toolkit'
import { structureTransactions } from '../hooks'
import useMonobankApi from '../hooks/useMonobankApi'
import { fakeData } from '../utils'

const initialState = {
  statusLoading: 'idle',
  balance: fakeData.balance,
  income: fakeData.incomes,
  expenses: fakeData.expenses,
  dataLoaded: false,
  transactions: fakeData.transactions,
  dailyIncome: fakeData.dailyIncome,
  dailyExpenses: fakeData.dailyExpenses,
  labels: [],
}

export const fetchBankInfo = token => async (dispatch, getState) => {
  const { getMonoData } = useMonobankApi()
  dispatch(dataFetching())
  try {
    const res = await getMonoData(token)
    res.forEach(item => {
      if (String(item.amount)[0] === '-') {
        let num = parseInt(String(item.amount).slice(1, item.amount.length))
        dispatch(incExpenses(num))
      } else {
        dispatch(incIncome(item.amount))
      }
    })
    dispatch(dataFetched(res))
  } catch {
    dispatch(dataFetchedError())
  }
}

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    dataFetching: state => {
      state.statusLoading = 'loading'
    },
    dataFetched: (state, action) => {
      state.statusLoading = 'idle'
      state.balance = action.payload[0].balance
      state.dataLoaded = true
      state.transactions = structureTransactions(action.payload)
    },
    dataFetchedError: state => {
      state.statusLoading = 'error'
    },
    incBalance: (state, action) => {
      state.balance += action.payload
    },
    incExpenses: (state, action) => {
      state.expenses += action.payload
    },
    incIncome: (state, action) => {
      state.income += action.payload
    },
    setDailyExpenses: (state, action) => {
      state.dailyExpenses = action.payload
    },
    setDailyIncome: (state, action) => {
      state.dailyIncome = action.payload
    },
    defineLabels: (state, action) => {
      state.labels = [...action.payload]
    },
    handleFakeData: state => {
      state.balance = fakeData.balance
      state.income = fakeData.incomes
      state.expenses = fakeData.expenses
      state.dataLoaded = false
      state.transactions = fakeData.transactions
      state.dailyIncome = fakeData.dailyIncome
      state.dailyExpenses = fakeData.dailyExpenses
    },
    setStatusLoading: (state, action) => {
      state.statusLoading = action.payload
    },
    rewriteTrackingStore: (state, action) => {
      state.statusLoading = action.payload.statusLoading
      state.balance = action.payload.balance
      state.income = action.payload.income
      state.expenses = action.payload.expenses
      state.dataLoaded = action.payload.dataLoaded
      state.transactions = action.payload.transactions
      state.dailyIncome = action.payload.dailyIncome
      state.dailyExpenses = action.payload.dailyExpenses
      state.labels = action.payload.labels
    },
  },
})

const { actions, reducer } = trackingSlice
export default reducer

export const {
  dataFetching,
  dataFetched,
  dataFetchedError,
  incBalance,
  incExpenses,
  incIncome,
  setDailyExpenses,
  setDailyIncome,
  defineLabels,
  handleFakeData,
  rewriteTrackingStore,
  setStatusLoading,
} = actions
