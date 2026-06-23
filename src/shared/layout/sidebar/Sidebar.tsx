import React ,{useEffect, useState} from 'react';
import { useDarkMode } from '../../context/DarkMode.tsx';
import { useEmailContext } from '../../context/EmailContext.tsx';
import handleFirestoreOperation from '../../../services/scud.ts';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../../../services/firebase.ts';
import { toast } from 'react-toastify';
import { useGroup } from '../../context/GroupContext.tsx';
import { categories } from '../../constants/category.ts';
import { useTaskContext } from '../../context/TaskContext.tsx';

const Sidebar = ({ action, data ,toggle}) => {
  const { isDarkMode ,toggleDarkMode } = useDarkMode();
  const { email, setEmail, logout } = useEmailContext();
  const {  reload :groupReload} = useGroup();
  const {  reload : taskReload} = useTaskContext();

  const handleLogout = () => {
    logout(); 
    toggle();
    groupReload();
    taskReload();
    
  };

  const { groups, fetchGroups, reload, loading, error } = useGroup();

  useEffect(() => {
    fetchGroups(`${email}`);
  }, [fetchGroups]);
  return (

  <>
    <div className={`hidden md:flex flex-col p-4 md:gap-4 w-full h-full ${isDarkMode ? 'bg-customLightBlue text-black' : 'bg-black text-white'}`}>

      
      




        <div className="mb-4 flex">

        {email ? 
        <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md"
         onClick={() => {
          action({ value: 'createTask', label: 'Create New Task' });

        }}
         
         >
          Create New
        </button>
        :
        <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md"
        onClick={() => {
         action({ value: 'signin', label: 'Sign In' });

       }}
        
        >
         Sign In
       </button>
      }


      </div>
    
       

      {email  &&
       <>

      <ul className="space-y-2 cursor-pointer">
        <li
          className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'all' ? 'bg-gray-500' : ''}`}
          onClick={() => {
            action({ value: 'all', label: 'All' });
          
          }}
        >
          All Tasks
        </li>
        <li
          className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'starred' ? 'bg-gray-500' : ''}`}
          onClick={() => {
            action({ value: 'starred', label: 'Starred' });
          }}
       
       >
          Starred
        </li>
        <li
          className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'archived' ? 'bg-gray-500' : ''}`}
          onClick={() => {
            action({ value: 'archive', label: 'Archived' });
          }}
       
       >
          Archive
        </li>
      </ul>


      <div className="mt-4">
        <h3 className="text-sm text-gray-400">List</h3>
      </div>

      <div className='flex flex-col gap-2'>


        
<ul className="space-y-2 cursor-pointer px-4">
{categories.map((category) => (
    <li
      key={category.value}
      className={`hover:bg-gray-500 p-2 rounded-md ${data.value === category.value ? 'bg-gray-500' : ''}`}
      onClick={() => {
        action({ value: category.value, label: category.label });
      }}
    >
      {category.label}
    </li>
  ))}
</ul>


      </div>

      <div className="mt-4">
        <h3 className="text-sm text-gray-400">My List</h3>
      </div>



      <div className='flex flex-col gap-2'>


        
<ul className="space-y-2 cursor-pointer px-4">

{groups && groups.length  > 0 ? (
  groups?.map((group, index) => (
    <li
      key={group.id}
      className={`hover:bg-gray-500 p-2 rounded-md ${data.value === group.name ? 'bg-gray-500' : ''}`}
      onClick={() => {
        action({ value: group.name, label: group.summary});
      }}
    >
      {group.name}
    </li>
  ))
) : (
  <li ></li>
)}

  
</ul>


      </div>


      

      <div className="mt-4">
        <ul className="space-y-2">
          <li
            className="hover:bg-gray-500 p-2 rounded-md cursor-pointer"
            onClick={() => {
              action({ value: 'createGroup', label: 'Create New Group' });
            
            }}
          >
            Create New Group
          </li>
        </ul>
      </div>



    
    
        </>
      
}

      <div>
        
      </div>
    </div>

    <div className={`flex md:hidden flex-col p-4 gap-4 w-full h-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>

<div className='w-full flex '>
  <p className='ml-auto mr-2 flex md:hidden'
  onClick={toggle}>
    X
  </p>

</div>



<div className="mb-4 flex md:hidden">
  {!email ? (
    <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md"
    
    onClick={() => {
      action({ value: 'signin', label: 'signin' });
      toggle();
    }}
    >
     Login
   </button>

  ) : 
  (<>
  <p>
  {email}

  </p>

  <div className="mb-4 hidden md:flex">
  <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md"
   onClick={() => {
    action({ value: 'createTask', label: 'Create New Task' });
    toggle();
  }}
   
   >
    Create New
  </button>
</div>

  </>

  )
  
  }
  
</div>


{email  &&
 <>

<ul className=" cursor-pointer">
  <li
    className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'all' ? 'bg-gray-500' : ''}`}
    onClick={() => {
      action({ value: 'all', label: 'All' });
      toggle();
    }}
  >
    All Tasks
  </li>
  <li
    className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'starred' ? 'bg-gray-500' : ''}`}
    onClick={() => {
      action({ value: 'starred', label: 'Starred' });
      toggle();
    }}
 
 >
    Starred
  </li>
</ul>


<div className="">
  <h3 className="text-sm text-gray-400">List</h3>
</div>

<div className='flex flex-col'>


  
<ul className="space-y-2 cursor-pointer px-4">
<li
className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'personal' ? 'bg-gray-500' : ''}`}
onClick={() => {
action({ value: 'personal', label: 'Personal' });
toggle();
}}

>
Personal
</li>
<li
className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'work' ? 'bg-gray-500' : ''}`}
onClick={() => {
action({ value: 'work', label: 'Work' });
toggle();
}}

>
Work
</li>
<li
className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'health' ? 'bg-gray-500' : ''}`}
onClick={() => {
action({ value: 'health', label: 'Health' });
toggle();
}}
>
Health and Fitness
</li>
<li
className={`hover:bg-gray-500 p-2 rounded-md ${data.value === 'financial' ? 'bg-gray-500' : ''}`}
onClick={() => {
action({ value: 'financial', label: 'Financial Management' });
toggle();
}}
>
Financial Management
</li>

</ul>


</div>

<div className="">
  <h3 className="text-sm text-gray-400">My List</h3>
</div>




  
<ul className=" cursor-pointer px-4">

{groups?.length > 0 ? (
groups?.map((task, index) => (
<li
key={task.id || index} // Use a unique key for better React rendering
className={`hover:bg-gray-500 p-2 rounded-md ${task.value === 'personal' ? 'bg-gray-500' : ''}`}
onClick={() => action({ value: 'personal', label: 'Personal' })}
>
{task.label || 'Personal'}
</li>
))
) : (
<li ></li>
)}


</ul>







<div className="mt-4">
  <ul className="space-y-2">
    <li
      className="hover:bg-gray-500 p-2 rounded-md cursor-pointer"
      onClick={() => {
        action({ value: 'createGroup', label: 'Create New Group' });
        toggle();
      }}
    >
      Create New Group
    </li>
    <li
      className=" p-2 rounded-md cursor-pointer"
      onClick={toggleDarkMode}
    >

      {isDarkMode ? 'Dark Mode ':'Light Mode'}
      
      
    </li>
    <li
      className=" p-2 rounded-md cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </li>
  </ul>
</div>


  </>

}

<div>
  
</div>
</div>


    </>   

  );
};

export default Sidebar;
