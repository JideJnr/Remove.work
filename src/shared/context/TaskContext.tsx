import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase.ts";
import { useEmailContext } from "./EmailContext.tsx";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{  children: ReactNode }> = ({
  
  children,
}) => {
  const { email } = useEmailContext();
  const [docData, setDocData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const tasksCollection = collection(db, "tasks");
      const emailQuery = query(tasksCollection, where("email", "==", email));
      const querySnapshot = await getDocs(emailQuery);

      if (!querySnapshot.empty) {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setDocData(documents);
        console.log("Document Data:", documents);
      } else {
        console.log("No document found with the specified email.");
        setDocData([]);
      }
    } catch (err) {
      console.error("Error reading document:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(); 
  }, [email]);

  const reload = async () => {
    await fetchDocuments();
  };

  return (
    <TaskContext.Provider value={{ docData, reload, isLoading, error }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
