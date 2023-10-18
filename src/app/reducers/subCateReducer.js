import { createSlice } from '@reduxjs/toolkit';

const subcateSlice = createSlice({
  name: 'subcategories',
  initialState: [],
  reducers: {
    setSubCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSubCategory } = subcateSlice.actions;
export default subcateSlice.reducer;
