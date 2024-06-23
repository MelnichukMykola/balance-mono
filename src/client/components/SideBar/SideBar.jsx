import { motion } from 'framer-motion'
import { SideBarItems } from './SIdeBarItems'
import './styles.scss'

const SideBar = ({
  sidebar,
  isOpen,
  containerRef,
  height,
  bgClasses,
  profileClasses,
  pages,
  route,
  toggleOpen
}) => {
  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        className={profileClasses}
      >
        <motion.div className={bgClasses} variants={sidebar} />
        {/* <motion.div 
          variants={variantsForItem}
          className='profile-name'>
          {userName}
        </motion.div> */}
        <SideBarItems pages={pages} route={route} toggleOpen={toggleOpen} />
      </motion.nav>
    </>
  )
}

export default SideBar

{
  /* <nav>
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
</nav> */
}
