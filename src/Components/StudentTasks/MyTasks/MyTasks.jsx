import React, { useState, useEffect } from "react";
import "./MyTasks.css";
import { connect } from "react-redux";
import Task from "../Task/Task";
import AddTask from "./AddTask.jsx";
import { useNavigate } from "react-router-dom";
import {
  addTask,
  editTask,
  deleteTask,
  completeTask,
  sendReminder,
  updateTaskStatus,
  updateNumTasks,
  updatePendingTasks,
  updateCompletedTasks,
  resetAuthState,
} from "../../../Actions/TaskActions.js";

const MyTasks = ({
  myTasks,
  addTask,
  editTask,
  userEmail,
  deleteTask,
  completeTask,
  sendReminder,
  updateNumTasks,
  updatePendingTasks,
  updateCompletedTasks,
  resetAuthState,
}) => {
  const navigate = useNavigate();
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    if (Array.isArray(myTasks)) {
      const userTasks = myTasks.filter((task) => task.userEmail === userEmail);

      updateNumTasks(userEmail, userTasks.length);

      const pendingTasksCount = userTasks.filter(
        (task) => task.status === "Pending"
      ).length;
      updatePendingTasks(userEmail, pendingTasksCount);

      const completedTasksCount = userTasks.filter(
        (task) => task.status === "Completed"
      ).length;
      updateCompletedTasks(userEmail, completedTasksCount);
    }
  }, [
    myTasks,
    userEmail,
    updateNumTasks,
    updatePendingTasks,
    updateCompletedTasks,
  ]);

  const navigateToAddTask = () => {
    setShowAddTask(true);
    navigate("/add-task");
  };

  const handleAddTask = (newTask) => {
    addTask(userEmail, newTask);
    setShowAddTask(false);
    updateNumTasks(userEmail, myTasks.length + 1);

    if (newTask.status === "Pending") {
      updatePendingTasks(
        userEmail,
        myTasks.filter((task) => task.status === "Pending").length + 1
      );
    } else if (newTask.status === "Completed") {
      updateCompletedTasks(
        userEmail,
        myTasks.filter((task) => task.status === "Completed").length + 1
      );
    }
  };

  const handleEditTask = (editedTask) => {
    editTask(editedTask, userEmail);
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = myTasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      deleteTask(taskId, userEmail);
      updateNumTasks(userEmail, myTasks.length - 1);

      if (taskToDelete.status === "Pending") {
        updatePendingTasks(
          userEmail,
          myTasks.filter((task) => task.status === "Pending").length - 1
        );
      } else if (taskToDelete.status === "Completed") {
        updateCompletedTasks(
          userEmail,
          myTasks.filter((task) => task.status === "Completed").length - 1
        );
      }
    }
  };

  const handleSetReminder = (task) => {
    sendReminder(task);
  };

  const handleCompleteTask = (taskId) => {
    const taskToUpdate = myTasks.find((task) => task.id === taskId);

    if (taskToUpdate && taskToUpdate.status === "Pending") {
      // Decrease pending tasks count
      updatePendingTasks(
        userEmail,
        myTasks.filter((task) => task.status === "Pending").length - 1
      );

      // Mark the task as completed
      handleStatusChange(taskId, "Completed");

      // Increase completed tasks count
      updateCompletedTasks(
        userEmail,
        myTasks.filter((task) => task.status === "Completed").length + 1
      );
    }
  };

  const handleStatusChange = (taskId, status) => {
    completeTask(taskId, userEmail);
    updateTaskStatus(taskId, status);
    updateNumTasks(userEmail, myTasks.length);
  };

  return (
    <div className="demo2">
      <div className="myTasks">
        <div className="MyTaskTitleSection">
          <h2 className="myTasksTitle">My Tasks</h2>
        </div>
        <div className="taskContainer">
          <div className="addTask" onClick={navigateToAddTask}>
            <div to="/add-task" className="plusButton">
              <span className="plusSymbol">+</span>
            </div>
            <h4 className="newTaskText">New Task</h4>
          </div>
          {showAddTask && <AddTask handleAddTask={handleAddTask} />}
          {Array.isArray(myTasks) &&
            myTasks
              .filter((task) => task.userEmail === userEmail)
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  onSetReminder={handleSetReminder}
                  onComplete={handleCompleteTask}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  const userEmail = state.auth.users.userEmail;
  console.log(userEmail);

  return {
    userEmail: userEmail,
    myTasks: state.auth.users[userEmail]?.tasks || [],
  };
};

const mapDispatchToProps = (dispatch) => ({
  addTask: (userEmail, newTask) => dispatch(addTask(userEmail, newTask)),
  editTask: (editedTask, userEmail) => dispatch(editTask(editedTask, userEmail)),
  deleteTask: (taskId, userEmail) => dispatch(deleteTask(taskId, userEmail)),
  completeTask: (taskId, userEmail) => dispatch(completeTask(taskId, userEmail)),
  sendReminder: (task) => dispatch(sendReminder(task)),
  updateTaskStatus: (taskId, status) =>
    dispatch(updateTaskStatus(taskId, status)),
  updateNumTasks: (userEmail, count) =>
    dispatch(updateNumTasks(userEmail, count)),
  updatePendingTasks: (userEmail, count) =>
    dispatch(updatePendingTasks(userEmail, count)),
  updateCompletedTasks: (userEmail, count) =>
    dispatch(updateCompletedTasks(userEmail, count)),
  resetAuthState: () => dispatch(resetAuthState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyTasks);
