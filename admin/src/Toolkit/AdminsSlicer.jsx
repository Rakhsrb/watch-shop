import { createSlice } from "@reduxjs/toolkit";

const AdminsSlicer = createSlice({
  name: "Admins",
  initialState: {
    data: {},
    isAuth: false,
    isPending: false,
    isError: "",
  },
  reducers: {
    getAdminsPending(state) {
      state.isPending = true;
      state.isError = "";
    },
    getAdminsSuccess(state, { payload }) {
      state.isAuth = true;
      state.data = payload;
      state.isPending = false;
    },
    getAdminsError(state, { payload }) {
      state.isPending = false;
      state.isError = payload;
    },
  },
});

export const { getAdminsError, getAdminsPending, getAdminsSuccess } =
  AdminsSlicer.actions;
export default AdminsSlicer.reducer;
