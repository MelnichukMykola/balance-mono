import HeaderContainer from '../containers/HeaderContainer'
import ProfileContainer from '../containers/ProifleContainer'
import './styles.scss'

function ProfilePage() {
  return (
    <div className=''>
      <HeaderContainer page='home' />
      <ProfileContainer />
    </div>
  )
}

export default ProfilePage;
