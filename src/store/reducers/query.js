import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: [],
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    addQuery: (state, { payload }) => {
      const giv = state.query;
      if (Array.isArray(payload)) {
        state.query = [...giv, ...payload];
      } else {
        state.query = [...giv, payload];
      }
    },

    addPreQuery: (state, { payload }) => {
      state.query = [...payload];
    },

    updateQuery: (state, { payload }) => {
      let { s, index } = payload;
      let q = state.query;
      let arr = [...q];
      console.log(payload);
      arr[index] = s;
      state.query = arr;
    },
  },
});

export const { addQuery, addPreQuery, updateQuery } = querySlice.actions;

export default querySlice.reducer;
