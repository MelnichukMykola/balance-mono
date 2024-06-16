import './styles.scss'

const Content = ({
  transactions,
  data,
  dataForPie,
  dataArea,
  options,
  columns,
  transOnFullDisplay,
  chartsOnFullDisplay,
  Table,
  Pie,
  Line,
  largePageSize,
  smallPageSize,
}) => {
  return (
    <>
      {transOnFullDisplay && (
        <div className='table-container'>
            <Table
              columns={columns}
              pagination={{
                pageSize: largePageSize,
                position: ['topMiddle'],
                showSizeChanger: false,
              }}
              size='small'
              dataSource={transactions}
              scroll={{ x: 'max-content' }}
            />
        </div>
      )}
      {chartsOnFullDisplay && (
        <div className='charts'>
          <div className='charts__line'>
            <Line data={data} options={options} />
          </div>
          <div className='charts__mixed'>
            <div className='charts__mixed_line'>
              <Line data={dataArea} options={options} />
            </div>
            <div className='charts__mixed_pie'>
              <Pie data={dataForPie} />
            </div>
          </div>
        </div>
      )}
      {!transOnFullDisplay && !chartsOnFullDisplay && (
        <div className='content'>
          <div className='content__chart'>
            <Line data={data} options={options} />
          </div>
          <div className='content__table'>
            <Table
              columns={columns}
              pagination={{
                pageSize: smallPageSize,
                position: ['topMiddle'],
                showSizeChanger: false,
              }}
              size='small'
              dataSource={transactions}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Content
