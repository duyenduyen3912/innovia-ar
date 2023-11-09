import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = '';

const ImageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    imageSearch: (_, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {imageSearch} = ImageSlice.actions;

export default ImageSlice.reducer;
