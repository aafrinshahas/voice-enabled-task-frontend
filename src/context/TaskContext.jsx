// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const TaskContext = createContext();

// const API_BASE = "http://localhost:5000/api/tasks";

// export const TaskProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);

//   // Convert Mongo document to frontend format
//   const mapTask = (task) => ({
//     id: task._id,
//     title: task.title,
//     priority: task.priority,
//     status: task.status,
//     dueDate: task.dueDate,
//     createdAt: task.createdAt,
//   });

//   // Load all tasks
//   const loadTasks = async () => {
//     try {
//       const res = await axios(API_BASE);
//       const data = await res.json();
//       setTasks(data.map(mapTask));
//     } catch (err) {
//       console.error("Error loading tasks:", err);
//     }
//   };

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   // Create
//   const createTask = async (task) => {
//     try {
//       const res = await axios(API_BASE, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(task),
//       });
//       const newTask = await res.json();
//       setTasks((prev) => [...prev, mapTask(newTask)]);
//     } catch (err) {
//       console.error("Error creating task:", err);
//     }
//   };

//   // Update
//   const updateTask = async (id, updatedFields) => {
//     try {
//       const res = await axios(`${API_BASE}/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedFields),
//       });

//       const updatedTask = await res.json();

//       setTasks((prev) =>
//         prev.map((task) =>
//           task.id === id ? mapTask(updatedTask) : task
//         )
//       );
//     } catch (err) {
//       console.error("Error updating task:", err);
//     }
//   };

//   // Delete
//   const deleteTask = async (id) => {
//     try {
//       await axios(`${API_BASE}/${id}`, {
//         method: "DELETE",
//       });
//       setTasks((prev) => prev.filter((t) => t.id !== id));
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   return (
//     <TaskContext.Provider
//       value={{ tasks, createTask, updateTask, deleteTask, loadTasks }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTasks = () => useContext(TaskContext);

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

const API_BASE = "http://localhost:5000/api/tasks";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const mapTask = (task) => ({
    id: task._id,
    title: task.title,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
    createdAt: task.createdAt,
  });

  // Load all tasks
  const loadTasks = async () => {
    try {
      const res = await axios.get(API_BASE);
      setTasks(res.data.map(mapTask));
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Create task
  const createTask = async (task) => {
    try {
      const res = await axios.post(API_BASE, task);
      setTasks((prev) => [...prev, mapTask(res.data)]);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Update task
  const updateTask = async (id, updatedFields) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, updatedFields);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? mapTask(res.data) : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask, loadTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

