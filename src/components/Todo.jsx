import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { db } from "../firebase/firebase";

const Todo = ({ taskTitle, completed, id }) => {
  const [isVisible, setIsVisible] = useState(completed);
  const taskRef = doc(db, "tasks", id);
  const handleClick = async () => {
    console.log("hello");
    setIsVisible(!isVisible);
    try {
      await updateDoc(taskRef, {
        completed: !isVisible,
      });
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <button
      className="text-black w-full h-16 mb-3 bg-[#E1F0DA] flex justify-between items-center rounded-2xl px-4"
      onClick={handleClick}
    >
      <h3>{taskTitle}</h3>

      <div className="w-8 h-8 bg-[#c2d2c3] flex items-center justify-center rounded-lg">
        {isVisible && <FaCheck color="#89b67f" size={25} />}
      </div>
    </button>
  );
};

export default Todo;
