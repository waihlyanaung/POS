"use client";
import { createSlice } from "@reduxjs/toolkit";

const voucherSlice = createSlice({
  name: "voucher",
  initialState: {
    voucher: null,
  },
  reducers: {
    addvoucher: (state, action) => {
      state.voucher = action.payload;
    },
    // Add more reducer functions as needed
  },
});

export const { addvoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
