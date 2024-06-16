import React from 'react'
import './styles.scss'

const Footer = ({ infoNames, info }) => {
  return (
    <div className='footer'>
      <div className='footer-container'>
        <p className='footer-month'>For month</p>
          {info.map((item, i) => (
              <div
                key={i}
                className='footer-block'
              >
              <p className='footer-block__text'>
                Total {infoNames[i]}: {(item / 100).toFixed(2)}
              </p>
              </div>
          ))}
      </div>
    </div>
  )
}

export default Footer
