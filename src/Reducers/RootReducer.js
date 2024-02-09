import { combineReducers } from 'redux';
import { taskReducer } from './TaskReducer.js';
import { authReducer } from './AuthReducer.js';

const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
});

export { rootReducer };
