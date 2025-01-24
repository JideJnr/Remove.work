'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useEmailContext } from '../../context/EmailContext.tsx';
import InputField from '../../components/input/InputField.tsx';

export default function Signin() {


  const { email, setEmail } = useEmailContext();


  const [newEmail, setNewEmail] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEmailSubmit = () => {
    if (newEmail) {
      setEmail(newEmail); // Set the email on submit
      setIsMenuOpen(false); // Close the menu after submission

    }
    setNewEmail(null);
  };

  const handleLogout = () => {
    setEmail(null); // Clear the email when logging out
    setIsMenuOpen(false); // Close the menu after logout
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev); // Toggle the menu state
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };


  return (

  <>
  {!email ? 
    <div className='w-full flex flex-col gap-4 bg-white p-4  rounded-xl' > 
                 
    <div className='w-full'>
    <InputField
      label="Your email"
      placeholder="Enter your email"
      value={newEmail}
      onChange={handleInputChange}
      required
    />
    </div>
 
    <button className='inline-block w-full
      bg-blue-500
      text-white py-2 px-4 rounded-md text-sm'
      onClick={handleEmailSubmit}>Login</button>

    </div>: 
    
    <div className='w-full flex flex-col gap-4 bg-white p-4  rounded-xl text-black' >

    <img/>
    <p>
    {email}
    </p>
    <button>
      Logout
    </button>
    </div>}
  </>
  )
}
