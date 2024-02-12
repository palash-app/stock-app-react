import { configureStore } from "@reduxjs/toolkit";
import query from "./reducers/query";

const store = configureStore({
  reducer: {
    query: query,
  },
});

export default store;
