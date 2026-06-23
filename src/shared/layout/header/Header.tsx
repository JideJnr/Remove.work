import React, { useState } from 'react';
import { useDarkMode } from '../../context/DarkMode.tsx';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useEmailContext } from '../../context/EmailContext.tsx';
import InputField from '../../components/input/InputField.tsx';

const Header = ({ calendarView, setSideBar, sideBar }) => {
  const calendarMode = () => calendarView(true);
  const taskMode = () => calendarView(false);

  const sideBarToggle = () => setSideBar(!sideBar);

  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
    <div className={`w-full p-4 flex gap-4 justify-between ${isDarkMode ? 'bg-customLightBlue text-black' : 'bg-black text-white'}`}>
      <div className='flex gap-4 w-full'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 flex my-auto"
          onClick={sideBarToggle}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <div className='flex  flex-1 '>
          <p className='text-3xl  mx-auto  '>
            Remote{' '}
            <span className='text-blue-900'>Work</span>
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 invisible "
         
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>

      <div className='md:flex gap-4 hidden'>
        <div className='flex gap-4'>
          

          <button onClick={toggleDarkMode} className="flex my-auto">
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
          <div className='w-fit h-fit flex my-auto'>
            
          <Menu as="div" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <MenuButton
              className="flex items-center justify-center w-[1.75rem] h-[1.75rem] bg-light border-light my-auto mr-4"
              onClick={handleMenuToggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </MenuButton>

            <MenuItems transition anchor="bottom" className="bg-white shadow-lg p-4 rounded top-full mt-1 left-0 z-10 min-w-96">
              {!email ? (
                <>
                 
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
               
                </>
              ) : (
                
                
                    <div className='w-full flex flex-col gap-4'>
                      <img />
                      <p>{email}</p>
                    
                  
                    <button className='inline-block w-full
                 bg-blue-500
               text-white py-2 px-4 rounded-md text-sm'
               onClick={handleLogout}>Logout</button>
                  
                </div>
              )}
            </MenuItems>
          </Menu>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
