import React, { useState } from 'react';
import handleFirestoreOperation from '../../../functions/firestore.ts';
import InputField from '../../components/input/InputField.tsx';
import { useEmailContext } from '../../context/EmailContext.tsx';
import { toast } from 'react-toastify';
import { useGroup } from '../../context/GroupContext.tsx';
const Group = () => {
  const { email } = useEmailContext();

  const [groupData, setGroupData] = useState({
    groupName: '',
    email: `${email}`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setGroupData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  

  const createDocument = async () => {
    if (!groupData.groupName) {
      toast.success('Please enter a group name.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await handleFirestoreOperation('groups', 'create', groupData);
      toast.success('Group created successfully!');
      setGroupData({
        groupName: '',
        email:`${email}`
      });
    } catch (error) {
      toast.error('An error occurred while creating the group.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { reload} = useGroup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDocument();
    reload();
  };



  return (
    <div className="p-4 md:p-8 bg-white w-full text-black  ">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <InputField
              id="groupName"
              label="Group Name"
              placeholder="Enter the group name"
              value={groupData.groupName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-12 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-block w-full ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-500'
              } text-white py-2 px-4 rounded-md text-sm`}
            >
              {isSubmitting ? 'Submitting...' : 'Create Group'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Group;
