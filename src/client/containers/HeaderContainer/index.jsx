import React, { useContext } from 'react'
import Header from '../../components/Header'
import { AuthContext } from '../../context/AuthContext'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/selectors'

const HeaderContainer = ({ page }) => {
  const { handleLogOut, isOpen, toggleOpen } = useContext(AuthContext)
  const { isUserLogged } = useSelector(selectUser)
  return (
    <Header
      handleLogOut={handleLogOut}
      page={page}
      isUserLogged={isUserLogged}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
    />
  )
}

export default HeaderContainer;
