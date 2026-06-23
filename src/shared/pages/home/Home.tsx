import React, { useState } from 'react'
import Header from '../../layout/header/Header.tsx'
import Sidebar from '../../layout/sidebar/Sidebar.tsx'
import MainContainer from '../../layout/container/MainContainer.tsx'
import Footer from '../../layout/footer/Footer.tsx'
import CalendarContainer from '../../layout/container/CalendarContainer.tsx'
import { useDarkMode } from '../../context/DarkMode.tsx'
import Create from '../../layout/form/Group.tsx'
import Task from '../../layout/form/Task.tsx'
import Group from '../../layout/form/Group.tsx'


const Home = () => {
  const [calendarViewVisibility, setCalendarViewVisibility] = useState(false);
  const [sideBarVisibility, setSideBarVisibility] = useState(true);


  const toggleVisibility = () => setSideBarVisibility(!sideBarVisibility);


  const [sidebar, setSideBar] = useState({ value: 'all', label: 'All' });

  const { isDarkMode } = useDarkMode();

  const handleConfirm = () => {
    console.log("Confirmed!");
    // Perform any action after confirming
  };



  return (
    <div className={` w-screen h-screen overflow-clip flex flex-col  ${isDarkMode ? 'bg-customLightBlue text-black':'bg-customDarkBlue text-white'}`}>

      <Header  calendarView={setCalendarViewVisibility} setSideBar={setSideBarVisibility} sideBar={sideBarVisibility}/>

      <div className="grid grid-cols-12 gap-4 w-full flex-1 ">
  {/* Sidebar */}
  <div
    className={`${sideBarVisibility ? 'fixed z-40 inset-0 bg-black bg-opacity-50 lg:bg-transparent lg:relative' : ''} ${
      sideBarVisibility ? 'col-span-2 lg:block' : 'hidden'
    }`}
  >
    <div
      className={`${
        sideBarVisibility ? 'w-64 lg:w-full' : 'hidden'
      } lg:block bg-white h-full transition-transform transform ${
        sideBarVisibility ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <Sidebar action={setSideBar} data={sidebar} toggle={toggleVisibility} />
    </div>
  </div>

  {/* Main Content */}
  <div
    className={`${
      sideBarVisibility ? 'col-span-10 lg:col-span-10' : 'col-span-12 lg:col-span-12'
    } my-4 p-4 md:p-8`}
  >
<div className="flex mx-auto max-w-6xl w-full">
  {sidebar.value === 'createGroup' ? (
    <Group />
  ) : sidebar.value === 'createTask' ? (
    <Task />
  ) 
   : (
    <MainContainer selection={sidebar} />
  )}
</div>


  </div>

 
      </div>


      <Footer/>
    </div>
  )
}

export default Home