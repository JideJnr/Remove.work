import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { db } from "../services/firebase.ts";
import { useState } from "react";

type FirestoreOperation = "create" | "read" | "update" | "delete";

/**
 * Custom hook for handling Firestore CRUD operations in React.
 */
const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles Firestore SCUD operations (Search, Create, Update, Delete).
   *
   * @param route - The Firestore collection path.
   * @param operation - The operation to perform: 'create', 'read', 'update', or 'delete'.
   * @param data - Data for 'create' or 'update' operations (optional).
   * @param id - Document ID for 'read', 'update', or 'delete' operations (optional).
   * @returns - The result of the Firestore operation.
   */
  const handleFirestoreOperation = async (
    route: string,
    operation: FirestoreOperation,
    data?: Record<string, any>,
    id?: string
  ): Promise<any> => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, route);

      switch (operation) {
        case "create":
          if (!data) throw new Error("Data is required for creating a document.");
          const createdDoc = await addDoc(collectionRef, data);
          return { id: createdDoc.id, ...data };

        case "read":
          if (id) {
            const docRef = doc(db, route, id);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) throw new Error("Document not found.");
            return { id: docSnap.id, ...docSnap.data() };
          } else {
            const querySnapshot = await getDocs(collectionRef);
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          }

        case "update":
          if (!id || !data) throw new Error("Document ID and data are required for updating.");
          const docToUpdate = doc(db, route, id);
          await updateDoc(docToUpdate, data);
          return { id, ...data };

        case "delete":
          if (!id) throw new Error("Document ID is required for deletion.");
          const docToDelete = doc(db, route, id);
          await deleteDoc(docToDelete);
          return { id, deleted: true };

        default:
          throw new Error("Invalid operation. Use 'create', 'read', 'update', or 'delete'.");
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleFirestoreOperation, loading, error };
};

export default useFirestore;
