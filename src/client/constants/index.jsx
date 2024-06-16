import { Tag } from 'antd'

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  aspectRatio: 5,
  // scales: {
  //   y: {
  //     stacked: true,
  //     grid: {
  //       display: true,
  //       color: 'rgba(255,99,132,0.2)',
  //     },
  //   },
  //   x: {
  //     grid: {
  //       display: false,
  //     },
  //   },
  // },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart For Month',
    },
  },
}

export const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'Description',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (text, { tags }) => {
      let classname = ''
      if (tags[0] === 'income') {
        classname = 'text-green-400'
      }
      return <p className={`${classname} font-bold`}>{text}</p>
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag === 'income' ? 'green' : 'red'

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
]
export function getOptions(
  income,
  expenses,
  dailyIncome,
  dailyExpenses,
  labels
) {
  const dataForPie = {
    labels: ['Incomes', 'Expenses'],
    datasets: [
      {
        label: 'Total',
        data: [(income / 100).toFixed(2), (expenses / 100).toFixed(2)],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(53, 162, 235)'],
        borderWidth: 1,
      },
    ],
  }

  const dataArea = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Incomes',
        data: dailyIncome,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        fill: true,
        label: 'Expenses',
        data: dailyExpenses,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Incomes',
        data: dailyIncome,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Expenses',
        data: dailyExpenses,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return { data, dataForPie, dataArea }
}

export function countPeriod() {
  const lastDate = new Date()
  const firstDate = new Date(lastDate)
  firstDate.setMonth(lastDate.getMonth() - 1)

  const currLabels = []

  for (
    let date = new Date(firstDate);
    date <= lastDate;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = `${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`
    currLabels.push(formattedDate)
  }

  return currLabels
}
function defineArraysForChart(transactions, labels) {
  let array = []
  for (let i = 0; i < labels.length; i++) {
    let allAmount = 0
    transactions.forEach(item => {
      if (item.date.slice(5, 10) === labels[i]) {
        let amount = Math.abs(parseFloat(item.amount))
        allAmount += amount
      }
    })

    array.push(allAmount)
  }
  return array
}

export function separateArraysForChart(transactions, labels, flag) {
  const expenses = transactions.filter(
    transaction => parseFloat(transaction.amount) < 0
  )
  const incomes = transactions.filter(
    transaction => parseFloat(transaction.amount) >= 0
  )
  if (flag === 'expenses') {
    return defineArraysForChart(expenses, labels)
  } else {
    return defineArraysForChart(incomes, labels)
  }
}
