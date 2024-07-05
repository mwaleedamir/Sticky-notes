import React from "react";
import search from './icons/search.png'
import { Link } from "react-router-dom"


const NavBar = () =>{

  const onSearch =() =>{
    alert("searching please wait")
  }

  return(
    <>
        <nav className="w-full h-16 bg-slate-600 p-3 flex justify-center gap-5 "> {/* NavBar */}

        <div className="flex gap-4 text-white">    
              <Link className="" to="/">Home</Link>
              <Link to="/About">About</Link>
        </div>

          <div className="flex justify-center border-2  border-green-50 w-56 h-9"> {/* search img and input bar */}
           <button onClick={()=>onSearch()}><img src={search} className="w-9 h-8 bg-white" alt="search"/></button> 
            <input className="w-56 pl-2 outline-transparent " type="text" name="textBox" placeholder="Textbox" id="" />
          </div>

          <div className="text-white flex justify-end">
            <Link to="/signup">signup</Link>
          </div>
        </nav>
    </>
  )
}

export default NavBar




// const Navbar = () => {
//   return (
//     <>

//     <nav className="bg-slate-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-xl font-bold">
//           <Link to="/">CRUD</Link>
//         </div>
//         <div className="hidden md:flex space-x-4">
//           <Link to="/Home" className="text-gray-300 hover:text-white">Home</Link>
//           <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
//           <Link to="/services" className="text-gray-300 hover:text-white">Services</Link>
//           <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
//         </div>
//         <div className="md:hidden ">
//           <Dnd/>
//           <button className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
//             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//     </>
//   );
// }

// export default Navbar;
