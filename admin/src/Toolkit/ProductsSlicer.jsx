import { createSlice } from "@reduxjs/toolkit";

const ProductSlicer = createSlice({
  name: "Product",
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: "",
  },
  reducers: {
    getProductPending(state) {
      state.isPending = true;
      state.isError = "";
    },
    getProductSuccess(state, { payload }) {
      state.isAuth = true;
      state.data = payload;
      state.isPending = false;
    },
    getProductError(state, { payload }) {
      state.isPending = false;
      state.isError = payload;
    },
  },
});

export const { getProductError, getProductPending, getProductSuccess } =
  ProductSlicer.actions;
export default ProductSlicer.reducer;
