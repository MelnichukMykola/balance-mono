import ContentContainer from '../containers/ContentContainer'
import FooterContainer from '../containers/FooterContainer'
import HeaderContainer from '../containers/HeaderContainer'

function TransactionsPage() {
  return (
    <div className='transactions-page'>
      <HeaderContainer page='transactions' />
      <ContentContainer transactionsOnFullDisplay='true' />
      <FooterContainer />
    </div>
  )
}

export default TransactionsPage
