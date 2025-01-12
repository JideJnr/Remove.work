import React from 'react'
import Header from './shared/layout/header/Header.tsx'
import Sidebar from './shared/layout/sidebar/Sidebar.tsx'
import MainContainer from './shared/layout/container/MainContainer.tsx'
import Footer from './shared/layout/footer/Footer.tsx'

const App = () => {
  return (
    <div className= ' w-screen h-screen flex flex-col gap-4 '>

      <Header/>

      <div className='flex gap-4 w-full'>

        <div>
          <Sidebar/>
        </div>
        <div className='flex flex-1'>
          <MainContainer/>
        </div>
        
        

      </div>

      <Footer/>
    </div>
  )
}

export default App