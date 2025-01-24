import React, { useState } from 'react';
import Button from '../../components/button/button.tsx';

const Task: React.FC = ({modal}) => {
  
  const [formData, setFormData] = useState({ name: '' });
 
 

  const handleSubmit = async () => {
    const { name } = formData;

    if (!name) {
      console.error('Please fill all required fields.');
      return;
    }

    try {
      console.log(name ? 'Account updated successfully!' : 'Account created successfully!');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 bg-white rounded-xl">
      <h1 className="text-xl font-bold">Task</h1>



      <div className="mt-6 flex justify-end gap-4">
        <Button
          text="Cancel"
          className="!bg-red-500"
          onClick={() => {
            console.log('Modal closed');
          }}
        />
        <Button
          text="Submit"
          loadingText="Submitting"
          className="!bg-green-500"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Task;
