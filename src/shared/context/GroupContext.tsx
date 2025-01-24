import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase.ts";
import { useEmailContext } from "./EmailContext.tsx";


const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC<{  children: ReactNode }> = ({ children }) => {
  const { email } = useEmailContext();
  
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  const fetchGroups = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const tasksCollection = collection(db, "groups");
      const emailQuery = query(tasksCollection, where("email", "==", email));
      const querySnapshot = await getDocs(emailQuery);

      if (!querySnapshot.empty) {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Group[];
        setGroups(documents);
        setCurrentEmail(email); // Store the email for reload
      } else {
        setGroups([]);
      }
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError("Failed to fetch groups.");
    } finally {
      setLoading(false);
    }
  };

  const reload = useCallback(() => {
    if (currentEmail) {
      fetchGroups(currentEmail);
    }
  }, [currentEmail]);

  return (
    <GroupContext.Provider value={{ groups, fetchGroups, reload, loading, error }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = (): GroupContextType => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
