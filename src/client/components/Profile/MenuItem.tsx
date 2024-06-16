import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};


export const MenuItem = ({ i, item, infoNames }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className='profile-block'
    >
      <div className='profile-title'>
        {infoNames[i]}
      </div>
      <div className='profile-sum'>
        {i < 3 ? (item / 100).toFixed(2) : item}
      </div>
    </motion.li>
  );
};
