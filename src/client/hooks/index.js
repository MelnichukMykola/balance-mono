export const structureTransactions = data => {
  return data.map((item, i) => {
    return {
      key: `${i + 1}`,
      description: item.description,
      amount: (item.amount / 100).toFixed(2),
      date: structureTime(item.time),
      tags: item.amount > 0 ? ['income'] : ['expense'],
    }
  })
}

function structureTime(time) {
  let ms = new Date(time * 1000)
  let year = ms.getFullYear()
  let month =
    ms.getMonth() < 10 ? `${'0' + (ms.getMonth() + 1)}` : ms.getMonth() + 1
  let date = ms.getDate() < 10 ? `${'0' + ms.getDate()}` : ms.getDate()
  let hours = ms.getHours() < 10 ? `${'0' + ms.getHours()}` : ms.getHours()
  let minutes =
    ms.getMinutes() < 10 ? `${'0' + ms.getMinutes()}` : ms.getMinutes()
  let seconds =
    ms.getSeconds() < 10 ? `${'0' + ms.getSeconds()}` : ms.getSeconds()
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

export function countOneMonthAgoTime() {
  const currentDate = new Date()
  const oneMonthAgo = new Date(currentDate)
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  const unixTimeOneMonthAgo = Math.floor(oneMonthAgo.getTime() / 1000)
  return unixTimeOneMonthAgo
}


