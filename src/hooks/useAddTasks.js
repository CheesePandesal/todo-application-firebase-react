import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useAddTask = () => {
  const tasksRef = collection(db, "tasks");

  const addTask = async ({ taskTitle, taskNotes, createdBy, email, user }) => {
    await addDoc(tasksRef, {
      taskTitle,
      taskNotes,
      completed: false,
      createdBy,   
      email,
      createdAt: serverTimestamp(),
      user,
    });
  };

  return { addTask };
};
