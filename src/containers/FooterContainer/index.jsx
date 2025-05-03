import React, { useEffect } from 'react'
import Footer from '../../components/Footer'
import { selectTracking } from '../../store/selectors'
import { useSelector } from 'react-redux'

const FooterContainer = () => {
  const { balance, income, expenses } = useSelector(selectTracking)

  const infoNames = [ 'Income', 'Balance', 'Expenses']

  return (
    <Footer info={[income, balance, expenses]} infoNames={infoNames}/>
  )
}

export default FooterContainer;