// Task.jsx
import React, { useState, useEffect } from "react";
import "./Task.css";
import { connect } from "react-redux";
import { sendReminder } from "../../../Actions/TaskActions.js";

const Task = ({ task, onDelete, onEdit, onComplete, sendReminder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    // Update status based on completion and deadline
    if (task.isComplete) {
      setStatus("Completed");
    } else if (new Date(task.deadline) < new Date()) {
      setStatus("Not Completed");
    } else {
      setStatus("Pending");
    }
  }, [task.isComplete, task.deadline]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  const handleInputChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetReminderClick = () => {
    if (status === "Pending") {
      sendReminder(task);
    }
  };

  const handleCompleteTaskClick = () => {
    if (status === "Pending") {
      onComplete(task.id);
    }
  };

  return (
    <div
      className={`task ${task.isComplete ? "complete" : ""} ${
        task.editMode ? "edit-mode" : ""
      } ${status === "Not Completed" ? "expired" : ""}`}
    >
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleInputChange}
          />
          <div className="editButtons">
            <button onClick={handleSaveClick} className="SaveButton">
              Save
            </button>
            <button onClick={handleCancelClick} className="CancelButton">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="taskInfo">
            <h3 className="myTaskTitle">{task.title}</h3>
            <p className="myTaskDescription">{task.description}</p>
            <p className="myTaskDeadline">Deadline: {task.deadline}</p>
            <p className="myTaskStatus">Status: {status}</p>
          </div>

          <div className="RemainderAndComplete">
            {status === "Pending" && (
              <>
                <button
                  onClick={handleSetReminderClick}
                  className="setRemainderButton"
                >
                  <i className="fa-solid fa-bell set-reminder"></i>
                  Set Reminder
                </button>
                <button
                  onClick={handleCompleteTaskClick}
                  className="markTaskCompleteButton"
                >
                  <i className="fa-solid fa-check complete"></i>
                  {task.isComplete ? "Undo" : "Complete"}
                </button>
              </>
            )}
          </div>
          <div className="EditAndDelete">
            <button onClick={handleEditClick} className="editTaskButton">
              <i className="fa-solid fa-pen-to-square edit"></i>
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="deleteTaskButton"
            >
              <i className="fa-solid fa-trash delete"></i>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default connect(null, { sendReminder })(Task);
