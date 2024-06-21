import ContentContainer from '../containers/ContentContainer'
import FooterContainer from '../containers/FooterContainer'
import HeaderContainer from '../containers/HeaderContainer'
import './styles.scss'

function Home() {
  return (
    <div className='home-page'>
      <HeaderContainer page='home' />
      <div className='overflowed-wrapper'>
        <ContentContainer />
        <FooterContainer />
      </div>
    </div>
  )
}

export default Home
