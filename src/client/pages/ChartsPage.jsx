import { useSelector } from 'react-redux'
import ContentContainer from '../containers/ContentContainer'
import FooterContainer from '../containers/FooterContainer'
import HeaderContainer from '../containers/HeaderContainer'
import { selectUser } from '../store/selectors'
import './styles.scss'

function ChartsPage() {
  return (
    <div className='charts-page'>
      <HeaderContainer page='charts' />
      <div className='overflowed-container'>
        <ContentContainer chartsOnFullDisplay='true' />
        <FooterContainer />
      </div>
    </div>
  )
}

export default ChartsPage
