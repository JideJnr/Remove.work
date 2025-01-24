import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React, { useEffect, useMemo, useState } from 'react'
import Task from '../task/Task.tsx';
import { db } from '../../../services/firebase.ts';
import { updateDoc, doc, increment } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useTaskContext } from '../../context/TaskContext.tsx';
import Table from '../../components/table/Table.tsx';
import BackArrow from '../../svgs/BackArrow.tsx';
import Archive from '../../svgs/Archive.tsx';
import Trash from '../../svgs/Trash.tsx';
import useFirestore from '../../../functions/firestore.ts';
import Like from '../../svgs/Like.tsx';
import FloatingButton from '../../button/FloatingButton.tsx';

const MainContainer: React.FC<MainContainerProps> = ({ selection }) => {
  const [view, setView] = useState<string>(() => {
    
    const storedView = localStorage.getItem("view");
    return storedView || "grid";
  });

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  const [detailsView, setDetailsView] = useState<string>(() => {
    const storedDetailsView = localStorage.getItem("detailsView");
    return storedDetailsView === "true"; 
  });
  
  useEffect(() => {
    localStorage.setItem("detailsView", detailsView.toString()); 
  }, [detailsView]);
  



  const [detailsData, setDetailsData] = useState([]);
 
  const setGrid = () => setView("grid");
  const setList = () => setView("list");

  const setDetailsActive = () => setDetailsView('true');
  const setDetailsPassive = () => setDetailsView('false');
 

  const columns: Column[] = useMemo(
    () => [
  
      {
        Header: "Summary",
        accessor: "summary",
      },
      {
        Header: "Details",
        accessor: "details",
      },

      
      {
        Header: "",
        accessor: "id",
        Cell: ({ value, row }: { value: string; row: any }) => {
          return (
            <button
              type="button"
              className="flex my-auto"
              onClick= {() => {
                setDetailsData(row);
                setDetailsActive();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              
            </button>
          );
        },
      },
      {
        Header: "",
        accessor: "id",
        Cell: ({ value, row }: { value: string; row: any }) => {
          return (
            <button
              type="button"
              className="hs-tooltip-toggle me-4"
              onClick= {() => {
                handleLike(row);
              }}
            >
              

      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`size-6 my-auto text-yellow-400 cursor-pointer ${
        row.like ? 'fill-yellow-400' : ''
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>

              
            </button>
          );
        },
      }


    ],
    [],
  );

  
  const { docData, reload, isLoading, error } = useTaskContext();

  const filteredData = React.useMemo(() => {
    if (!selection?.value?.length  ) {
      return docData;
    }

    if ( selection?.value === 'all' ) {
      
      return docData;
    }

    if ( selection?.value === 'starred' ) {
      
      return docData.filter((item) => item.like === true);
    }
    // Otherwise, filter the tasks by the selected categories
    return docData.filter((item) => selection.value.includes(item.category));
  }, [docData, selection]);


  const handleLike = async (task: Task) => {
    try {
      const taskRef = doc(db, "tasks", task.id); 
      const currentLikeValue = task.like || false; 
  
      await updateDoc(taskRef, {
        like: !currentLikeValue, 
      });

      reload()
      toast.success(`Task "${task.title}" like status updated to: ${!currentLikeValue}`);
    } catch (error) {
      toast.error("Error updating like status:", error);
    }
  };
  const { handleFirestoreOperation, loading,

   } = useFirestore();

  const deleteDocument = async () => {
    try {
      await handleFirestoreOperation("users", "delete", undefined, "user123");
      console.log("Document deleted.");
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  const updateDocument = async () => {
    try {
      const updatedData = { age: 31 };
      await handleFirestoreOperation("users", "update", updatedData, "user123");
      console.log("Document updated.");
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };


  const handleArchiveClick = async () => {
    try {
      if (!detailsData.id) throw new Error("Document ID is missing.");
      
      // Prepare the updated data: toggle 'archived' or set it to true by default
      const updatedData = { archived: !detailsData.archived };
  
      // Update Firestore document
      await handleFirestoreOperation("tasks", "update", updatedData, detailsData.id);
  
      toast.success("Document archived successfully.");
      
      // Optionally reset states
      setDetailsData([]);
      setDetailsPassive();
    } catch (err) {
      console.error("Error archiving document:", err);
    }
  };
  
  

  return (


      <>
      { detailsView === 'true' ?
      (

        <div className="p-4 md:p-8 bg-white w-full text-black flex flex-col gap-4 cursor-pointer rounded-xl"
        >
          <div className='w-full flex '>
          <div className='flex '>

         
            <BackArrow className='' onClick={(e) => {
                setDetailsData([]);
                setDetailsPassive()
              }}/>
            
          </div>

          <div className='flex ml-auto gap-2'>

              <Archive
                className=""
                onClick={handleArchiveClick}
              />



            <Like className={`size-6 my-auto text-yellow-400 cursor-pointer ${
                            detailsData ? 'fill-yellow-400' : ''
                          }`}  onClick={(e) => {
                        
                        handleLike(detailsData)
              }}/>

            <Trash className='' onClick={(e) => {
                setDetailsData([]);
                setDetailsPassive()
              }}/>

           


          </div>
          </div>
         <form >
           <div className="grid grid-cols-12 gap-4">
             <div className="col-span-12 flex flex-col md:flex-row  gap-2">

              <label htmlFor="targetDate" className="block text-sm font-semibold text-gray-700">
                  Summary
              </label>
              
               <p>
                {detailsData.summary}
               </p>
               <p>

               </p>
             </div>
   
             <div className="col-span-12 flex flex-col md:flex-row  gap-2">
              <label htmlFor="targetDate" className="block text-sm font-semibold text-gray-700">
                  Details
                </label>
                <p>
                {detailsData.detail}
               </p>
             </div>
   
             <div className="col-span-12 flex flex-col md:flex-row  gap-2">
               <label htmlFor="targetDate" className="block text-sm font-semibold text-gray-700">
                 Date
               </label>
               <p>
               {detailsData.targetDate}
               </p>
             </div>
   
             <div className="col-span-12 flex flex-col md:flex-row  gap-2">
               <label htmlFor="priority" className="block text-sm font-semibold text-gray-700">
                 Priority
               </label>
               <p>
               {detailsData.priority}
               </p>
             </div>
   
             <div className="col-span-12 flex flex-col md:flex-row  gap-2">
               <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                 Category
               </label>
                <p>
                {detailsData.category}
                </p>
             </div>
   
           
           </div>
         </form>
       </div>
      )
      :
      (
      <div className='w-full h-full p-4 md:p-8 flex flex-col gap-4 bg-customLightBlue flex-1 rounded-xl text-black' >

      <div className='flex justify-between  w-full'>
        <p className='text-xl font-semibold'>
        {selection?.label||'All Task'}
        </p>



        <Menu>
          <MenuButton className="flex items-center justify-center w-[1.75rem] h-[1.75rem] bg-light border-light"
          >
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>

          </MenuButton>

          <MenuItems
            transition
            anchor="bottom"
            className="bg-white shadow-lg p-2 rounded top-full mt-1 left-0 z-10 min-w-32"

          >
            <div className='p-2 hover:bg-gray-200 cursor-pointer'>
              <p>
                Sort By
              </p>
            </div>
            <MenuItem>
              <div className='p-2 hover:bg-gray-200 cursor-pointer'>
              <p>
                Date 
              </p>
              </div>
            </MenuItem>
            <MenuItem >
            <div className='p-2 hover:bg-gray-200 cursor-pointer'>
              
              <p>
                Priority
              </p>
              </div>
            </MenuItem>
          
            <MenuItem>
            <div className='p-2 hover:bg-gray-200 cursor-pointer'>
              
            <p>
              
            </p>
            </div>
            </MenuItem>
            <MenuItem>
            <div className='p-2  border-t  border-gray-300 hover:bg-gray-200 cursor-pointer'>
              
              <p className='' onClick={setList}>
                  List View
              </p>
            </div>
            </MenuItem>
            <MenuItem>
            
            <div className='p-2 hover:bg-gray-200 cursor-pointer'>
              
              <p onClick={setGrid}>
                  Grid View
              </p>
              </div>
            </MenuItem>
            <MenuItem>
            <div className='p-2 border-t border-gray-300 hover:bg-gray-200 cursor-pointer'>
              
            <p>Clear Completed Tasks

            </p>
            </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>


      
      <div className="grid grid-cols-12 gap-4">
  {view === 'list' ? (
    
    <div className='col-span-12'>
      <Table
        columns={columns}
        data={filteredData}
        
      />
    </div>
  
  ) : view === 'grid' ? (
    filteredData.length > 0 ? (
      filteredData.map((task) => (
        <div
          key={task.id}
          onClick={() => {
            setDetailsData(task);
            setDetailsActive();
          }}
          className="col-span-12 md:col-span-6 p-4 bg-gray-100 rounded-md mb-2 flex w-full cursor-pointer"
        >
          <div>
            <h3 className="font-semibold">{task.title || 'No Title Found'}</h3>
            <p>{task.description || 'No Description Found'}</p>
          </div>
          <div className="flex ml-auto">

            <Like  className={`size-6 my-auto text-yellow-400 cursor-pointer ${
                task.like ? 'fill-yellow-400' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(task);
              }} />
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-12 py-4 font-medium">
        <p>No tasks available</p>
      </div>
    )
  ) : (
    <div className="col-span-12 py-4 font-medium">
      <p>No tasks available</p>
    </div>
  )}
</div>



      </div>
      )
      }
      
      
      </>


 
   
  )
}

export default MainContainer