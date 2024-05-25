import { useState } from "react";
import Todo from "./components/Todo";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import Login from "./pages/Login";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { useAddTask } from "./hooks/useAddTasks";
import { collection } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import { useGetUserInfo } from "./hooks/useGetUserInfo";
import { useGetTask } from "./hooks/useGetTasks";
import { signOut } from "firebase/auth";
const cookies = new Cookies();
export default function App() {
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
  });
  const tasksRef = collection(db, "tasks");
  const { addTask } = useAddTask();
  const { tasks } = useGetTask();
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const { displayName, profilePicture, userID } = useGetUserInfo();
  const [showModal, setShowModal] = useState(false);

  const [tasksDoneCount, setTasksDoneCount] = useState(0);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      cookies.remove("name");
      cookies.remove("profilePicture");
      cookies.remove("uid");
      window.location.reload(true);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const updateTasksDone = () => {
    const completedTasks = tasks.filter((task) => task.completed === true);
    setTasksDoneCount(completedTasks.length);
    console.log(tasksDoneCount);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
    // Check if the input values are empty
    if (formData.title.trim() === "" || formData.notes.trim() === "") {
      return; // Return early if values are empty
    }
    console.log("this is inside the handleSubmit button");
    addTask({
      taskTitle: formData.title,
      taskNotes: formData.notes,
      createdBy: auth.currentUser.displayName,
      email: auth.currentUser.email,
      user: auth.currentUser.uid,
    });
    // Add your logic to handle the form data here
    console.log(formData);
    setFormData({ title: "", notes: "" });
    setShowModal(false);
    updateTasksDone();
    toast.success("Goal Added!");
    console.log("this is how many tasks are done", tasksDoneCount);
  };

  if (!isAuth) {
    return <Login setIsAuth={setIsAuth} />;
  }
  return (
    <div className="bg-[#dae9d8] w-full h-screen flex justify-center items-center font-sans overflow-hidden">
      <div className="bg-[#89b67f] h-screen min-w-[300px] max-w-[500px] text-white pt-12 relative">
        {showModal && (
          <form
            className="h-96 w-96 absolute z-10 top-1/2 text-black left-1/2 translate-x-[-50%] translate-y-[-50%] p-8 bg-white rounded-[40px] shadow-2xl"
            onSubmit={handleSubmit}
          >
            <button className="absolute right-4 top-4" onClick={toggleModal}>
              <IoClose size={30} />
            </button>
            <h1 className="text-3xl font-semibold pt-12">New Task</h1>
            <div className="mt-12">
              <input
                type="text"
                name="title"
                placeholder="I want to..."
                className="border-0 focus:border-0 focus:outline-none focus:border-b focus:border-black w-full"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mt-8">
              <input
                type="text"
                name="notes"
                placeholder="Notes..."
                className="border-0 focus:border-0 focus:outline-none focus:border-b focus:border-black w-full"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-[#89b67f] p-4 text-white w-full mt-12 rounded-xl"
              type="submit"
            >
              Add New Task
            </button>
          </form>
        )}
        <header className="flex px-8 justify-between">
          <div className="flex items-center gap-4">
            {profilePicture && (
              <div className="w-16 h-16 bg-contain">
                <img
                  src={profilePicture}
                  alt="Profile Picture"
                  className="w-full h-full rounded-full bg-contain"
                />
              </div>
            )}
            <h1 className="text-2xl">{displayName}</h1>
          </div>
          <button onClick={signUserOut}>
            <FaSignOutAlt color="white" size={30} />
          </button>
        </header>
        <div className="px-8 pt-16">
          <blockquote className="text-3xl pb-4">
            "It always seems impossible until it's done"
          </blockquote>
          <span>-Nelson Mandela</span>
        </div>
        <div className="bg-white w-full h-3/5 absolute bottom-0 rounded-t-[60px]">
          <main className="px-8 pt-12">
            <div className="flex text-black items-center justify-between">
              <h1 className="text-3xl font-semibold">My Little Goals</h1>
              <div className="text-gray-400">{tasks.length} Goals Today</div>
            </div>

            <div className="overflow-auto h-80 scrollbar-hide mt-8">
              {tasks.map((task) => {
                return (
                  <Todo
                    key={task.id}
                    taskTitle={task.taskTitle}
                    completed={task.completed}
                    id={task.id}
                  />
                );
              })}
            </div>
          </main>
          <footer className="absolute bottom-8 left-[200px]">
            <button
              className="w-20 h-20 rounded-full bg-[#89b67f] flex justify-center items-center hover:scale-125 transition-all"
              onClick={toggleModal}
            >
              <FaPlus color="white" size={30} />
            </button>
          </footer>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
