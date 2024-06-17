import React, { useContext } from 'react'
import Header from '../../components/Header'
import { AuthContext } from '../../context/AuthContext'
import { useSelector } from 'react-redux'
import { selectTracking, selectUser } from '../../store/selectors'

const HeaderContainer = ({ page }) => {
  const { handleLogOut, isOpen, toggleOpen } = useContext(AuthContext)
  const { isUserLogged } = useSelector(selectUser)
  const { dataLoaded } = useSelector(selectTracking)
  return (
    <Header
      handleLogOut={handleLogOut}
      page={page}
      isUserLogged={isUserLogged}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      dataLoaded={dataLoaded}
    />
  )
}

export default HeaderContainer;
