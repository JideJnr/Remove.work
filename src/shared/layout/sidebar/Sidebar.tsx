import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col p-4'>
      <div>
        <button>
          Create New
        </button>
      </div>
      <ul>
        All Tasks
      </ul>
      <ul>
        Starred
      </ul>

      <div>
        List
      </div>

      <div>
        <ul>
        Create new group
        </ul>
      </div>
    </div>

  )
}

export default Sidebar