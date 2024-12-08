import { createSlice } from "@reduxjs/toolkit";

const TasksStateSlice = createSlice({
  name: "tasksState",
  initialState: {
    tasksState: [],
    filteredTasks: [],
  },
  reducers: {
    addTasks: (state, action) => {
      const newItems = action.payload;
      state.tasksState = newItems;
      state.filteredTasks = newItems;
    },
    filterByPriority: (state, action) => {
      const priorityType = action.payload;

      if (priorityType === "All") {
        state.filteredTasks = state.tasksState;
      } else {
        const newI = state.tasksState.map((category) => {
          const filteredItems = category.items.filter(
            (task) => task.priority === priorityType
          );
          return {
            ...category,
            items: filteredItems,
          };
        });

        state.filteredTasks = newI;
      }
    },
  },
});

export const { addTasks, filterByPriority } = TasksStateSlice.actions;

export default TasksStateSlice.reducer;
