import { createSlice } from "@reduxjs/toolkit";

const OrdersSlicer = createSlice({
  name: "Orders",
  initialState: {
    data: [],
    isPending: false,
    isError: "",
  },
  reducers: {
    getOrdersPending(state) {
      state.isPending = true;
      state.isError = "";
    },
    getOrdersSuccess(state, { payload }) {
      state.data = payload;
      state.isPending = false;
    },
    getOrdersError(state, { payload }) {
      state.isPending = false;
      state.isError = payload;
    },
  },
});

export const { getOrdersError, getOrdersPending, getOrdersSuccess } =
  OrdersSlicer.actions;
export default OrdersSlicer.reducer;
