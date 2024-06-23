import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDimensions } from '../../hooks/use-dimensions'
import { AuthContext } from '../../context/AuthContext'
// import { selectTracking, selectUser } from '../../store/selectors'
import SideBar from '../../components/SideBar/SideBar'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 33px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at calc(100% - 40px) 37px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const variantsForItem = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

// const infoNames = [
//   'Total Income',
//   'Total Expenses',
//   'Total Balance',
//   "Today's Income",
//   "Today's Expense",
// ]

const SideBarContainer = () => {
  // const { balance, income, expenses, dailyIncome, dailyExpenses } =
    // useSelector(selectTracking)
  // const { userName } = useSelector(selectUser)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)
  const { isOpen, toggleOpen } = useContext(AuthContext)
  const [bgClasses, setBgClasses] = useState('bg-closed')
  const [profileClasses, setProfileClasses] = useState('prf-closed')

  const path = window.location.pathname
  const lastSegmentOfPath = path.substring(path.lastIndexOf('/') + 1);

  useEffect(() => {
    if (!isOpen) {
      setProfileClasses('sidebar_closed')
      setBgClasses('bg_closed')
    } else {
      setProfileClasses('sidebar')
      setBgClasses('sidebar-bg')
    }
  }, [isOpen])

  // const info = [
  //   income,
  //   expenses,
  //   balance,
  //   dailyIncome[dailyIncome.length - 1],
  //   dailyExpenses[dailyExpenses.length - 1],
  // ]

  const pages = [
    'home',
    'transactions',
    'charts',
    'profile'
  ]

  return (
    <>
      <SideBar
        // balance={balance}
        // income={income}
        // expenses={expenses}
        // dailyIncome={dailyIncome}
        // dailyExpenses={dailyExpenses}
        // info={info}
        // infoNames={infoNames}
        // userName={userName}
        toggleOpen={toggleOpen}
        sidebar={sidebar}
        variants={variants}
        variantsForItem={variantsForItem}
        isOpen={isOpen}
        containerRef={containerRef}
        height={height}
        bgClasses={bgClasses}
        profileClasses={profileClasses}
        pages={pages}
        route={lastSegmentOfPath}
      />
    </>
  )
}

export default SideBarContainer
