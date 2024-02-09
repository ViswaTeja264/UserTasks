const initialState = {
  users: {},
  isLoggedIn: false,
};

const BGImage = new Image();
BGImage.src = "src/assets/ProfileBGImage.png";

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      const { userData } = action.payload;
      console.log(userData);
      const newUserEmail = userData.email;

      console.log(state);

      return {
        ...state,
        users: {
          ...state.users,
          userEmail: newUserEmail,
          [newUserEmail]: {
            ...userData,
            tasks: [],
            user: {
              ...userData.user,
              user: userData,
              imageURL: "",
              profileImageURL: "",
            },
          },
        },
      };

    case "SET_LOGGED_IN_STATUS":
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case "LOGIN_SUCCESS":
      const { user } = action.payload;
      console.log("login success user ", user);
      console.log(user.user.email);

      console.log(state);

      return {
        ...state,
        users: {
          ...state.users,
          userEmail: user.user.email,
          [user.user.email]: {
            ...user,
            tasks: state.users[user.user.email].tasks || [],
            user: {
              ...state.users[user.user.email].user,
              imageURL: state.users[user.user.email].user.imageURL || "",
              profileImageURL:
                state.users[user.user.email].user.profileImageURL || "",
            },
          },
        },
        isLoggedIn: true,
      };

    case "ADD_TASK":
      console.log(state);
      const { addTaskUserEmail, newTask } = action.payload;
      const status = newTask.status;

      const nextState = {
        ...state,
        users: {
          ...state.users,
          [addTaskUserEmail]: {
            ...state.users[addTaskUserEmail],
            tasks: [...(state.users[addTaskUserEmail]?.tasks || []), newTask],
            numTasks: (state.users[addTaskUserEmail]?.numTasks || 0) + 1,
            pendingTasks:
              status === "Pending"
                ? (state.users[addTaskUserEmail]?.pendingTasks || 0) + 1
                : state.users[addTaskUserEmail]?.pendingTasks || 0,
            completedTasks:
              status === "Completed"
                ? (state.users[addTaskUserEmail]?.completedTasks || 0) + 1
                : state.users[addTaskUserEmail]?.completedTasks || 0,
          },
        },
      };

      return nextState;

    // EDIT_TASK
    case "EDIT_TASK":
      const { editedTask, editTaskUserEmail } = action.payload;

      // Ensure the user exists in the state before updating
      if (!state.users[editTaskUserEmail]) {
        return state;
      }

      const myUpdatedTasks = state.users[editTaskUserEmail].tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );

      return {
        ...state,
        users: {
          ...state.users,
          [editTaskUserEmail]: {
            ...state.users[editTaskUserEmail],
            tasks: myUpdatedTasks,
          },
        },
      };

    // DELETE_TASK
    case "DELETE_TASK":
      const { deleteTaskTaskId, deleteTaskUserEmail } = action.payload;

      // Find the deleted task
      const deletedTask = state.users[deleteTaskUserEmail].tasks.find(
        (task) => task.id === deleteTaskTaskId
      );

      // Ensure the user exists in the state before updating
      if (!state.users[deleteTaskUserEmail]) {
        return state;
      }

      // Filter out the deleted task from tasks
      const newUpdatedTasks = state.users[deleteTaskUserEmail].tasks.filter(
        (task) => task.id !== deleteTaskTaskId
      );

      return {
        ...state,
        users: {
          ...state.users,
          [deleteTaskUserEmail]: {
            ...state.users[deleteTaskUserEmail],
            tasks: newUpdatedTasks,
            numTasks: (state.users[deleteTaskUserEmail]?.numTasks || 0) - 1,
            pendingTasks:
              deletedTask.status === "Pending"
                ? (state.users[deleteTaskUserEmail]?.pendingTasks || 0) - 1
                : state.users[deleteTaskUserEmail]?.pendingTasks || 0,
            completedTasks:
              deletedTask.status === "Completed"
                ? (state.users[deleteTaskUserEmail]?.completedTasks || 0) - 1
                : state.users[deleteTaskUserEmail]?.completedTasks || 0,
          },
        },
      };

    // COMPLETE_TASK
    case "COMPLETE_TASK":
      const { taskId, completeTaskUserEmail } = action.payload;
      const updatedTasks = state.users[completeTaskUserEmail]?.tasks.map(
        (task) =>
          task.id === taskId
            ? { ...task, isComplete: !task.isComplete, status: "Completed" }
            : task
      );

      const completedTask = updatedTasks.find((task) => task.id === taskId);
      const updatedPendingTasksOnComplete =
        completedTask && completedTask.status === "Pending"
          ? (state.users[completeTaskUserEmail]?.pendingTasks || 0) - 1
          : state.users[completeTaskUserEmail]?.pendingTasks || 0;
      const updatedCompletedTasksOnComplete =
        completedTask && completedTask.status === "Completed"
          ? (state.users[completeTaskUserEmail]?.completedTasks || 0) + 1
          : state.users[completeTaskUserEmail]?.completedTasks || 0;

      return {
        ...state,
        users: {
          ...state.users,
          [completeTaskUserEmail]: {
            ...state.users[completeTaskUserEmail],
            tasks: updatedTasks || [], // Ensure tasks is an array
            pendingTasks: updatedPendingTasksOnComplete,
            completedTasks: updatedCompletedTasksOnComplete,
          },
        },
      };

    // UPDATE_NUM_TASKS
    case "UPDATE_NUM_TASKS":
      const { UpdateNumTasksUserEmail, UpdateNumTasksCount } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [UpdateNumTasksUserEmail]: {
            ...state.users[UpdateNumTasksUserEmail],
            numTasks: UpdateNumTasksCount,
          },
        },
      };

    // UPDATE_PENDING_TASKS
    case "UPDATE_PENDING_TASKS":
      const { updatePendingTasksUserEmail, updatePendingTasksCount } =
        action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [updatePendingTasksUserEmail]: {
            ...state.users[updatePendingTasksUserEmail],
            pendingTasks: updatePendingTasksCount,
          },
        },
      };

    // UPDATE_COMPLETED_TASKS
    case "UPDATE_COMPLETED_TASKS":
      const { updateCompletedTasksUserEmail, updateCompletedTasksCount } =
        action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [updateCompletedTasksUserEmail]: {
            ...state.users[updateCompletedTasksUserEmail],
            completedTasks: updateCompletedTasksCount,
          },
        },
      };

    // SEND_REMINDER_SUCCESS
    case "SEND_REMINDER_SUCCESS":
      const { remainderTaskId, remainderUserEmail } = action.payload;
      console.log(remainderUserEmail);
      const taskToSendReminder = state.users[remainderUserEmail].tasks.find(
        (task) => task.id === remainderTaskId
      );
      return {
        ...state,
        tasks: state.users[remainderUserEmail].tasks.map((task) =>
          task.id === remainderTaskId
            ? { ...task, remindersSent: task.remindersSent + 1 }
            : task
        ),
      };

    case "UPDATE_USER_IMAGE":
      const { userEmail, imageURL } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [userEmail]: {
            ...state.users[userEmail],
            user: {
              ...state.users[userEmail].user,
              imageURL: imageURL,
            },
          },
        },
      };

    case "UPDATE_BACKGROUND_IMAGE":
      const { bgUserEmail, bgImageURL } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [bgUserEmail]: {
            ...state.users[bgUserEmail],
            user: {
              ...state.users[bgUserEmail]?.user,
              imageURL: bgImageURL || BGImage,
            },
          },
        },
      };

    case "UPDATE_PROFILE_IMAGE":
      const { profileUserEmail, profileImageURL } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [profileUserEmail]: {
            ...state.users[profileUserEmail],
            user: {
              ...state.users[profileUserEmail]?.user,
              profileImageURL: profileImageURL || BGImage,
            },
          },
        },
      };

    case "UPDATE_USER_INFORMATION":
      const { updateUserEmail, updatedUserInformation } = action.payload;
      console.log(state);
      return {
        ...state,
        users: {
          ...state.users,
          [updateUserEmail]: {
            ...state.users[updateUserEmail],
            user: {
              ...state.users[updateUserEmail]?.user,
              ...updatedUserInformation,
            },
          },
        },
      };

    case "UPDATE_ABOUT_DATA":
      const { aboutDataUserEmail, aboutData } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [aboutDataUserEmail]: {
            ...state.users[aboutDataUserEmail],
            user: {
              ...state.users[aboutDataUserEmail]?.user,
              aboutData: aboutData,
            },
          },
        },
      };

    case "RESET_AUTH_STATE":
      return initialState;

    default:
      return state;
  }
};

export { authReducer };
