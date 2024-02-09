export const registerSuccess = (userData) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: { userData },
  };
};

export const setLoggedInStatus = (isLoggedIn) => {
  return {
    type: "SET_LOGGED_IN_STATUS",
    payload: { isLoggedIn },
  };
};

export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { user },
  };
};

export const addTask = (addTaskUserEmail, newTask) => {
  return {
    type: "ADD_TASK",
    payload: { addTaskUserEmail, newTask },
  };
};

export const editTask = (editedTask, editTaskUserEmail) => {
  return {
    type: "EDIT_TASK",
    payload: { editedTask, editTaskUserEmail },
  };
};

export const deleteTask = (deleteTaskTaskId, deleteTaskUserEmail) => {
  return {
    type: "DELETE_TASK",
    payload: { deleteTaskTaskId, deleteTaskUserEmail },
  };
};

export const completeTask = (taskId, completeTaskUserEmail) => {
  return {
    type: "COMPLETE_TASK",
    payload: { taskId, completeTaskUserEmail },
  };
};

export const updateTaskStatus = (taskId, status) => {
  return {
    type: "UPDATE_TASK_STATUS",
    payload: { taskId, status },
  };
};

export const updateNumTasks = (
  UpdateNumTasksUserEmail,
  UpdateNumTasksCount
) => {
  return {
    type: "UPDATE_NUM_TASKS",
    payload: { UpdateNumTasksUserEmail, UpdateNumTasksCount },
  };
};

export const updatePendingTasks = (
  updatePendingTasksUserEmail,
  updatePendingTasksCount
) => {
  return {
    type: "UPDATE_PENDING_TASKS",
    payload: { updatePendingTasksUserEmail, updatePendingTasksCount },
  };
};

export const updateCompletedTasks = (
  updateCompletedTasksUserEmail,
  updateCompletedTasksCount
) => {
  return {
    type: "UPDATE_COMPLETED_TASKS",
    payload: { updateCompletedTasksUserEmail, updateCompletedTasksCount },
  };
};

export const sendReminder = (task) => {
  const remainderTaskId = task.id;
  const remainderUserEmail = task.userEmail;
  console.log(remainderUserEmail);
  return async (dispatch) => {
    await fetch("http://localhost:3000/api/send-reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: remainderUserEmail,
        subject: "Task Reminder",
        text: `Don't forget about your task: ${task.title}!`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Reminder Send Successfully");
        dispatch({
          type: "SEND_REMINDER_SUCCESS",
          payload: { remainderTaskId, remainderUserEmail },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch({
          type: "SEND_REMINDER_ERROR",
          payload: error.message,
        });
      });
  };
};

export const updateUserImage = (userEmail, imageURL) => {
  return {
    type: "UPDATE_USER_IMAGE",
    payload: { userEmail, imageURL },
  };
};

export const resetAuthState = () => {
  return {
    type: "RESET_AUTH_STATE",
  };
};

export const updateBackgroundImage = (bgUserEmail, bgImageURL) => {
  console.log(bgImageURL);
  return {
    type: "UPDATE_BACKGROUND_IMAGE",
    payload: { bgUserEmail, bgImageURL },
  };
};

export const updateProfileImage = (profileUserEmail, profileImageURL) => {
  return {
    type: "UPDATE_PROFILE_IMAGE",
    payload: { profileUserEmail, profileImageURL },
  };
};

export const updateUserInformation = (
  updateUserEmail,
  updatedUserInformation
) => {
  console.log(updatedUserInformation);
  return {
    type: "UPDATE_USER_INFORMATION",
    payload: { updateUserEmail, updatedUserInformation },
  };
};

export const updateAboutData = (aboutDataUserEmail, aboutData) => {
  console.log(aboutDataUserEmail, aboutData)
  return {
    type: "UPDATE_ABOUT_DATA",
    payload: {
      aboutDataUserEmail,
      aboutData,
    },
  };
};
