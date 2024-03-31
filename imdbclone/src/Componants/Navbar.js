import React from 'react'
import Logo from '../Assets/Logo.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex space-x-8 items-center pl-3 py-4 bg-violet-400 border-b-2 border-white'>
      {/* <a href='/'><h3 className='text-blue-700 font-bold'> Movies </h3></a>
      <a href='/WatchList'><h3 className='text-blue-700 font-bold '> WatchList</h3></a> */}
      <Link to='/'> <img src={Logo} alt='movies-logo' className='w-[60px]' /> </Link>
      <Link to='/'><h3 className='text-blue-700 font-bold'> Movies </h3></Link>
      <Link to='/WatchList'><h3 className='text-blue-700 font-bold '> WatchList</h3></Link>
    </div>
  )
}

export default Navbar