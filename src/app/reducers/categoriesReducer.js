import { createSlice } from '@reduxjs/toolkit';

const categoySlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategories } = categoySlice.actions;
export default categoySlice.reducer;
