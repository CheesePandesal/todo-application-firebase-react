import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTask = () => {
  const [tasks, setTasks] = useState([]);
  const { userID } = useGetUserInfo();
  const tasksRef = collection(db, "tasks");
  const getTasks = async () => {
    let unsubscribe;
    try {
      const queryMessages = query(
        tasksRef,
        where("user", "==", userID),
        orderBy("createdAt", "desc")
      );
      unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let newTasks = [];
        snapshot.forEach((doc) => {
          newTasks.push({ ...doc.data(), id: doc.id });
        });

        setTasks(newTasks);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error(err);
    }
    return () => unsubscribe();
  };
  useEffect(() => {
    getTasks();
  }, []);

  return { tasks };
};
