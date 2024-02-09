import React, { useState } from "react";
import "./AddTask.css";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../../../Actions/TaskActions.js';

const AddTask = ({ userEmail, addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status:"Pending",
  });

  const navigate = useNavigate();

  const handlingAddTask = () => {
    const createdTask = {
      id: Math.random(),
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
      isComplete: false,
      status:newTask.status,
      userEmail: userEmail,
    };

    console.log(userEmail);

    // Invoke the callback function to send the created task to the parent component
    addTask(userEmail, createdTask);

    // Reset the form or perform any other necessary actions
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      status:"Pending",
    });

    // Optionally, you can navigate back to MyTasks component
    navigate('/dashboard');
  };

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="addTaskContainer">
      <h2 className="newTaskHeading">Add New Task</h2>
      <input
        type="text"
        name="title"
        className="newTaskInput"
        value={newTask.title}
        placeholder="Enter Title*"
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        className="newTaskInputDescription"
        value={newTask.description}
        placeholder="Enter Description*"
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="deadline"
        className="newTaskInput"
        value={newTask.deadline}
        placeholder="Enter Deadline*"
        onChange={handleInputChange}
      />
      <button onClick={handlingAddTask} className="AddTaskButton">Add Task</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const userEmail = state.auth.users.userEmail;

  return {
    userEmail: userEmail,
  };
};

export default connect(mapStateToProps, { addTask })(AddTask);