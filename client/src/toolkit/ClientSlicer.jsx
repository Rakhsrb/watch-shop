import { createSlice } from "@reduxjs/toolkit";

const ClientSlicer = createSlice({
  name: "Client",
  initialState: {
    data: {},
    isPending: false,
    isError: "",
    isAuth: false,
  },
  reducers: {
    getClientPending(state) {
      state.isPending = true;
      state.isError = "";
    },
    getClientSuccess(state, { payload }) {
      state.isAuth = true;
      state.data = payload;
      state.isPending = false;
    },
    getClientError(state, { payload }) {
      state.isPending = false;
      state.isError = payload;
    },
  },
});

export const { getUserError, getUserPending, getUserSuccess } =
  ClientSlicer.actions;
export default ClientSlicer.reducer;
