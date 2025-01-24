import React, { useState } from 'react';
import handleFirestoreOperation from '../../../functions/firestore.ts';
import InputField from '../../components/input/InputField.tsx';
import { toast } from 'react-toastify';
import { useEmailContext } from '../../context/EmailContext.tsx';
import { useGroup } from '../../context/GroupContext.tsx';
import { categories } from '../../constants/category.ts';

const Task = () => {
  const { email } = useEmailContext();
  console.log(email)
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    targetDate: '',
    priority: 'low',
    email:`${email}`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type, multiple } = e.target;

    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setTaskData((prev) => ({
        ...prev,
        [id]: selectedOptions,
      }));
    } else {
      setTaskData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const createDocument = async () => {
    if (!taskData.title || !taskData.description || !taskData.targetDate || !taskData.category) {
      toast.success('Please fill in all the required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await handleFirestoreOperation('tasks', 'create', taskData);
      toast('Task created successfully!');
      setTaskData({
        title: '',
        description: '',
        category: '',
        targetDate: '',
        priority: 'low',
        email:`${email}`
        
      });
    } catch (error) {
      
      toast('An error occurred while creating the task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDocument();
  };

  const { groups, fetchGroups, reload, loading, error } = useGroup();
  
  return (
    <div className="p-4 md:p-8 bg-white w-full text-black flex flex-col gap-4">
     <p className='text-xl font-semibold'>
        Create New Task
     </p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <InputField
              id="title"
              label="Title"
              placeholder="Enter a title"
              value={taskData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-12">
            <InputField
              id="description"
              label="Description"
              placeholder="Enter description"
              value={taskData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-12">
            <label htmlFor="targetDate" className="block text-sm font-semibold text-gray-700">
              Date
            </label>
            <div className="relative mt-1">
              <input
                type="datetime-local"
                id="targetDate"
                value={taskData.targetDate}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="col-span-12">
            <label htmlFor="priority" className="block text-sm font-semibold text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="col-span-12">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={taskData.category}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
             
              {categories?.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
              {groups?.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-12 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-block w-full ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-500'
              } text-white py-2 px-4 rounded-md text-sm`}
            >
              {isSubmitting ? 'Submitting...' : 'Create Task'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Task;
