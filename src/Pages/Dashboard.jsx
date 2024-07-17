import React from 'react'
import Navbar  from '../Modules/Navbar'
import Sidebar from '../Modules/sidebar'
import bg from '../Pages/icons/1.jpg'

const Home = () => {
  return (
    <div >
      <Navbar bg={bg}/>
      <Sidebar bg={bg}/>
    </div>
  )  
}
export default Home


