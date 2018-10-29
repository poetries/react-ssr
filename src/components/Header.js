import React from 'react'
import { Link } from 'react-router-dom'

const Header = ()=>{
  return (
    <div>
      <Link to="/">Home</Link><br/>
      <Link to="/search">Search</Link><br/>
      <Link to="/detail/123">Detail</Link>
    </div>
  )
}

export default Header
