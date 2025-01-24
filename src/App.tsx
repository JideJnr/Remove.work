import React, { useEffect, useState } from 'react'
import Header from './shared/layout/header/Header.tsx'
import Sidebar from './shared/layout/sidebar/Sidebar.tsx'
import MainContainer from './shared/layout/container/MainContainer.tsx'
import Footer from './shared/layout/footer/Footer.tsx'
import CalendarContainer from './shared/layout/container/CalendarContainer.tsx'
import { useDarkMode } from './shared/context/DarkMode.tsx'
import Create from './shared/layout/form/Group.tsx'
import Task from './shared/layout/form/Task.tsx'
import Group from './shared/layout/form/Group.tsx'
import Signin from './shared/layout/form/Signin.tsx'
import FloatingButton from './shared/button/FloatingButton.tsx'


const App = () => {
  const [calendarViewVisibility, setCalendarViewVisibility] = useState(false);
  const [sideBarVisibility, setSideBarVisibility] = useState(
    () => JSON.parse(localStorage.getItem('sideBarVisibility') || 'false'));
  const toggleVisibility = () => setSideBarVisibility(!sideBarVisibility);
  const [sidebar, setSideBar] = useState(() => {
    const storedSidebar = localStorage.getItem('sidebar');
    return storedSidebar ? JSON.parse(storedSidebar) : { value: 'all', label: 'All' };
  });
  useEffect(() => {
    localStorage.setItem('sideBarVisibility', JSON.stringify(sideBarVisibility));
  }, [sideBarVisibility]);

  useEffect(() => {
    localStorage.setItem('sidebar', JSON.stringify(sidebar));
  }, [sidebar]);


  const { isDarkMode } = useDarkMode();

  return (
    <div className={` w-screen h-screen overflow-clip flex flex-col  ${isDarkMode ? 'bg-white text-black':'bg-customDarkBlue text-white'}`}>

      <Header  calendarView={setCalendarViewVisibility} setSideBar={setSideBarVisibility} sideBar={sideBarVisibility}/>

      <div className="grid grid-cols-12 gap-4 w-full flex-1 s">
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
    } my-4 p-4 md:p-8 flex-grow `}
  >
<div className="flex mx-auto max-w-6xl w-full h-full">
  {sidebar.value === 'createGroup' ? (
    <Group />
  ) : sidebar.value === 'createTask' ? (
    <Task />
  )  : sidebar.value === 'signin' ? (
    
      <Signin/>
  
  
  ) : calendarViewVisibility ? (
    <CalendarContainer />
  ) :(
    <>
    <MainContainer selection={sidebar} />
    <FloatingButton 
    onClick={() => {
      setSideBar({ value: 'createTask', label: 'Create New Task' });

    }}/>
    </>
  )}
</div>


  </div>

 
      </div>


      <Footer/>
    </div>
  )
}

export default App