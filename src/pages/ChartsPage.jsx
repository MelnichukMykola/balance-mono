import ContentContainer from '../containers/ContentContainer'
import FooterContainer from '../containers/FooterContainer'
import HeaderContainer from '../containers/HeaderContainer'

function ChartsPage() {
  return (
    <div className='charts-page'>
      <HeaderContainer page='charts' />
      <ContentContainer chartsOnFullDisplay='true' />
      <FooterContainer />
    </div>
  )
}

export default ChartsPage
