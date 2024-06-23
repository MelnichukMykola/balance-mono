import { motion } from 'framer-motion'
import * as React from 'react'
import { Link } from 'react-router-dom'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

export const SideBarItem = ({ page, route, toggleOpen }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`${
        page.toLowerCase() === route && 'sidebar-block_active'
      } sidebar-block`}
      onClick={toggleOpen}
    >
      <Link to={`/${page}`}>
        {page.charAt(0).toUpperCase() + page.slice(1)}
      </Link>
    </motion.li>
  )
}
