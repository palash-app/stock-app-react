import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  given: [],
  when: [],
  then: [],
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    addGivenQuery: (state, { payload }) => {
      const giv = state.given;
      state.given = [...giv, payload];
      state.given.unshift(payload);
      console.log(payload);
    },

    addWhenQuery: (state, { payload }) => {
      const wh = state.when;
      state.when = [...wh, payload];
    },
    addThenQuery: (state, { payload }) => {
      const th = state.then;
      state.then = [...th, payload];
    },
    updateQuery: (state, { payload }) => {
      let { s, index } = payload;
      state.given[index] = s;
    },
    resetQuery: state => {
      state = initialState;
    },
  },
});

export const {
  addGivenQuery,
  addWhenQuery,
  addThenQuery,
  resetQuery,
  updateQuery,
} = querySlice.actions;

export default querySlice.reducer;
