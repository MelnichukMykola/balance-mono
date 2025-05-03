import { countOneMonthAgoTime } from './index'

const useMonoBankApi = () => {
  const _API_BASE = `https://api.monobank.ua/personal/statement/0/${countOneMonthAgoTime()}`

  const getMonoData = async (token) => {
    return await fetch(_API_BASE, {
      method: 'GET',
      headers: {
        'X-Token': token,
      },
    })
      .then(response => response.json())
      .catch(() => console.log('Something went wrong....'))
  }
  return { getMonoData }
}

export default useMonoBankApi
