import { motion } from 'framer-motion'
import * as React from 'react'
import { MenuItem } from './MenuItem'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}



export const MenuItems = ({ info, infoNames}) => (
  <>

    <motion.ul variants={variants} className='profile-blocks'>
      {info.map((item, i) => (
        <MenuItem i={i} key={i} item={item} infoNames={infoNames} />
      ))}
    </motion.ul>
  </>
)

