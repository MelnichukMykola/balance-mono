import Hamburger from 'hamburger-react'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import ProfileContainer from '../../containers/ProfileContainer'
import './styles.scss'

const Header = ({ page, handleLogOut, isUserLogged, isOpen, toggleOpen, dataLoaded }) => {
  return (
    <div className='header'>
      <div className='header-left'>
        <div className='header-left__title'>Balance</div>
        <nav>
          <ul className='header-nav'>
            <li className={page === 'home' ? `header-nav_active` : ''}>
              <Link to='/home'>Home</Link>
            </li>
            <li className={page === 'transactions' ? `header-nav_active` : ''}>
              <Link to='/transactions'>Transactions</Link>
            </li>
            <li className={page === 'charts' ? `header-nav_active` : ''}>
              <Link to='/charts'>Charts</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='header-right'>
        {!isUserLogged && (
          <div className='header-registration'>
            <div className='header-login'>
              <Link to='/sign-in'>Log In</Link>
            </div>
            <div className='header-signup'>
              <Link to='/sign-up'>Sign Up</Link>
            </div>
          </div>
        )}
        {isUserLogged && (
          <>
            <button
              onClick={() => handleLogOut()}
              className='header-right_logout'
            >
              <CiLogout size='1.6em' />
            </button>
            <div className='header-right_btn'>
              <Hamburger toggled={isOpen} toggle={toggleOpen} size='30' />
            </div>
            <ProfileContainer />
          </>
        )}
      </div>
    </div>
  )
}

export default Header
