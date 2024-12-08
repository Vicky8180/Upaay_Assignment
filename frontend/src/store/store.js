import { configureStore } from '@reduxjs/toolkit';
import AssignList from './slices/AssignList';
import TasksStateSlice from "./slices/TasksState"
const store = configureStore({
  reducer: {
    AssignList:AssignList,
    TasksStateSlice:TasksStateSlice
  
    
  },
});

export default store;