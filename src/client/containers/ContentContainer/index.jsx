import { Table } from 'antd'
import { Chart, registerables } from 'chart.js'
import 'chartjs-plugin-annotation'
import React, { useEffect, useState } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import useWindowDimensions from '../../hooks/useWindowDimensions.jsx'
import Content from '../../components/Content'
import { columns, getOptions, options } from '../../constants/index'
import { selectTracking, selectUser } from '../../store/selectors'

Chart.register(...registerables)

const ContentContainer = ({
  chartsOnFullDisplay,
  transactionsOnFullDisplay,
}) => {
  const [smallPageSize, setSmallPageSize] = useState(8)
  const [largePageSize, setLargePageSize] = useState(12)
  const { labels, dailyIncome, dailyExpenses, transactions, expenses, income } =
    useSelector(selectTracking)
    const { isUserLogged } = useSelector(selectUser)

  const { data, dataArea, dataForPie } = getOptions(
    income,
    expenses,
    dailyIncome,
    dailyExpenses,
    labels
  )

  const { height } = useWindowDimensions()

  useEffect(() => {
    setSmallPageSize(Math.floor(height / 150))
    setLargePageSize(Math.floor(height / 73))
  }, [height])

  return (
    <>
      <Content
        transactions={transactions}
        labels={labels}
        data={data}
        dataArea={dataArea}
        dataForPie={dataForPie}
        options={options}
        columns={columns}
        chartsOnFullDisplay={chartsOnFullDisplay}
        transOnFullDisplay={transactionsOnFullDisplay}
        Line={Line}
        Pie={Pie}
        Table={Table}
        largePageSize={largePageSize}
        smallPageSize={smallPageSize}
        isUserLogged={isUserLogged}
      />
    </>
  )
}

export default ContentContainer
