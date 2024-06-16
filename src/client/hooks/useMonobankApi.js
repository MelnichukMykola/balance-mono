import { countOneMonthAgoTime } from './index'

// Roma -  uRHd27KwCdhRQ8FjiC9OtaEqMGHEl9J_WSMWIrXwByZ0
// DimaV - uxX8XXvlq6EreQFwzkRtN_ZDbLun6MK9EasUiPES4Ss4 - doesn't work
// Kolia - umjWGjuGZBL7HlM88rmv_5uXLVujtNau0Wys93G84tVo

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
