import { createSlice } from "@reduxjs/toolkit";

const AssignListSlice = createSlice({
  name: "assignList",
  initialState: {
    assignList: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItems = action.payload;

      state.assignList = [
        ...state.assignList.filter(
          (existingItem) =>
            !newItems.some((newItem) => newItem._id === existingItem._id)
        ),
        ...newItems,
      ];
    },

    removeItem: (state, action) => {
      const assigneeIdToRemove = action.payload;
      state.assignList = state.assignList.filter(
        (item) => item._id !== assigneeIdToRemove[0]._id
      );
    },
  },
});

export const { addItem, removeItem } = AssignListSlice.actions;

export default AssignListSlice.reducer;
