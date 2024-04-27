import React from 'react'
import { Link } from 'react-router-dom'
import './BottomNavbar.css'

const BottomNavbar = () => {
  return (
    <div className='bottom-navbar'>
        <ul className='bottom-navbar-list'>
            <li>
                <Link to='/winterwear' className='item'>WINTERWEAR</Link>
            </li>
            <li>
                <Link to='/men' className='item'>MEN</Link>
            </li>
            <li>
                <Link to='/women' className='item'>WOMEN</Link>
            </li>
            <li>
                <Link to='/plus-size' className='item'>PLUS SIZE</Link>
            </li>
        </ul>
    </div>
  )
}

export default BottomNavbar