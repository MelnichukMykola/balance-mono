import { motion } from 'framer-motion'
import { MenuItems } from './MenuItems'
import './styles.scss'

const Profile = ({
  infoNames,
  variantsForItem,
  sidebar,
  info,
  isOpen,
  containerRef,
  height,
  userName,
  bgClasses,
  profileClasses,
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
        <motion.div 
          variants={variantsForItem}
          className='profile-name'>
          {userName}
        </motion.div>
        <MenuItems info={info} infoNames={infoNames} />
      </motion.nav>
    </>
  )
}

export default Profile
