// const initialState = {
//   tasks: [],
//   users: {},
// };

// const taskReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // ADD_TASK
//     // case "ADD_TASK":
//     //   const newTask = action.payload;
//     //   const status = newTask.status;
//     //   return {
//     //     ...state,
//     //     tasks: [...state.tasks, newTask],
//     //     users: {
//     //       ...state.users,
//     //       [newTask.userEmail]: {
//     //         ...state.users[newTask.userEmail],
//     //         numTasks: (state.users[newTask.userEmail]?.numTasks || 0) + 1,
//     //         pendingTasks:
//     //           status === "Pending"
//     //             ? (state.users[newTask.userEmail]?.pendingTasks || 0) + 1
//     //             : state.users[newTask.userEmail]?.pendingTasks || 0,
//     //         completedTasks:
//     //           status === "Completed"
//     //             ? (state.users[newTask.userEmail]?.completedTasks || 0) + 1
//     //             : state.users[newTask.userEmail]?.completedTasks || 0,
//     //       },
//     //     },
//     //   };

//     // // EDIT_TASK
//     // case "EDIT_TASK":
//     //   const editedTask = action.payload;
//     //   return {
//     //     ...state,
//     //     tasks: state.tasks.map((task) =>
//     //       task.id === editedTask.id ? editedTask : task
//     //     ),
//     //   };

//     // // DELETE_TASK
//     // case "DELETE_TASK":
//     //   const deletedTask = state.tasks.find(
//     //     (task) => task.id === action.payload
//     //   );
//     //   const updatedPendingTasksOnDelete =
//     //     deletedTask.status === "Pending"
//     //       ? (state.users[deletedTask.userEmail]?.pendingTasks || 0) - 1
//     //       : state.users[deletedTask.userEmail]?.pendingTasks || 0;
//     //   const updatedCompletedTasksOnDelete =
//     //     deletedTask.status === "Completed"
//     //       ? (state.users[deletedTask.userEmail]?.completedTasks || 0) - 1
//     //       : state.users[deletedTask.userEmail]?.completedTasks || 0;

//     //   return {
//     //     ...state,
//     //     tasks: state.tasks.filter((task) => task.id !== action.payload),
//     //     users: {
//     //       ...state.users,
//     //       [deletedTask.userEmail]: {
//     //         ...state.users[deletedTask.userEmail],
//     //         numTasks: (state.users[deletedTask.userEmail]?.numTasks || 0) - 1,
//     //         pendingTasks: updatedPendingTasksOnDelete,
//     //         completedTasks: updatedCompletedTasksOnDelete,
//     //       },
//     //     },
//     //   };

//     // // COMPLETE_TASK
//     // case "COMPLETE_TASK":
//     //   const updatedTasks = state.tasks.map((task) =>
//     //     task.id === action.payload
//     //       ? { ...task, isComplete: !task.isComplete, status: "Completed" }
//     //       : task
//     //   );

//     //   const completedTask = updatedTasks.find(
//     //     (task) => task.id === action.payload
//     //   );
//     //   const updatedPendingTasksOnComplete =
//     //     completedTask.status === "Pending"
//     //       ? (state.users[completedTask.userEmail]?.pendingTasks || 0) - 1
//     //       : state.users[completedTask.userEmail]?.pendingTasks || 0;
//     //   const updatedCompletedTasksOnComplete =
//     //     completedTask.status === "Completed"
//     //       ? (state.users[completedTask.userEmail]?.completedTasks || 0) + 1
//     //       : state.users[completedTask.userEmail]?.completedTasks || 0;

//     //   return {
//     //     ...state,
//     //     tasks: updatedTasks,
//     //     users: {
//     //       ...state.users,
//     //       [completedTask.userEmail]: {
//     //         ...state.users[completedTask.userEmail],
//     //         pendingTasks: updatedPendingTasksOnComplete,
//     //         completedTasks: updatedCompletedTasksOnComplete,
//     //       },
//     //     },
//     //   };

//     // // UPDATE_NUM_TASKS
//     // case "UPDATE_NUM_TASKS":
//     //   const { userEmail, count } = action.payload;

//     //   console.log(userEmail);
//     //   console.log(state.users);
//     //   return {
//     //     ...state,
//     //     users: {
//     //       ...state.users,
//     //       [userEmail]: {
//     //         ...state.users[userEmail],
//     //         numTasks: count,
//     //       },
//     //     },
//     //   };

//     // // UPDATE_PENDING_TASKS
//     // case "UPDATE_PENDING_TASKS":
//     //   const { updatedPendingTasksUserEmail, updatedPendingTasksCount } =
//     //     action.payload;
//     //   return {
//     //     ...state,
//     //     users: {
//     //       ...state.users,
//     //       [updatedPendingTasksUserEmail]: {
//     //         ...state.users[updatedPendingTasksUserEmail],
//     //         pendingTasks: updatedPendingTasksCount,
//     //       },
//     //     },
//     //   };

//     // // UPDATE_COMPLETED_TASKS
//     // case "UPDATE_COMPLETED_TASKS":
//     //   const { updatedCompletedTasksUserEmail, updatedCompletedTasksCount } =
//     //     action.payload;
//     //   return {
//     //     ...state,
//     //     users: {
//     //       ...state.users,
//     //       [updatedCompletedTasksUserEmail]: {
//     //         ...state.users[updatedCompletedTasksUserEmail],
//     //         completedTasks: updatedCompletedTasksCount,
//     //       },
//     //     },
//     //   };

//     // // SEND_REMINDER_SUCCESS
//     // case "SEND_REMINDER_SUCCESS":
//     //   const taskId = action.payload;
//     //   const taskToSendReminder = state.tasks.find((task) => task.id === taskId);
//     //   return {
//     //     ...state,
//     //     tasks: state.tasks.map((task) =>
//     //       task.id === taskId
//     //         ? { ...task, remindersSent: task.remindersSent + 1 }
//     //         : task
//     //     ),
//     //   };

//     default:
//       return state;
//   }
// };

// export { taskReducer };
