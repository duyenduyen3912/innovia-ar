import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = '';

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    dataSearch: (_, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {dataSearch} = SearchSlice.actions;

export default SearchSlice.reducer;
