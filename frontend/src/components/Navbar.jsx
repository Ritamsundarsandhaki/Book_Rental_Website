import React from 'react'

function Navbar() {
  return (
   <>
        <nav className="bg-blue-600 p-4">
         <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Book_Rental_Website</h1>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Services</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
        
        </button>
      </div>

      
    </nav>
   </>
  )
}

export default Navbar
