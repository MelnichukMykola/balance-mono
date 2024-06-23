import { motion } from 'framer-motion'
import * as React from 'react'
import { SideBarItem } from './SideBarItem'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export const SideBarItems = ({ pages, route, toggleOpen }) => (
  <>
    <motion.ul variants={variants} className='sidebar-blocks'>
      {pages.map((page, i) => (
        <SideBarItem
          i={i}
          key={i}
          page={page}
          route={route}
          toggleOpen={toggleOpen}
        />
      ))}
    </motion.ul>
  </>
)
