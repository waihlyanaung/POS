"use client";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    quantity: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products?.push(action.payload);
    },
    removeProduct: (state, action) => {
      const productIdToRemove = action.payload.id;
      state.products = state.products.filter(
        (product) => product.id !== productIdToRemove
      );
    },
    setActive: (state, action) => {
      const itemId = action.payload;
      state.products.forEach((item) => {
        item.active = item.id === itemId;
      });
    },
    qtyChange: (state, action) => {
      const payloadQuantity = parseInt(action.payload);
      if (!isNaN(payloadQuantity)) {
        state.products = state.products.map((item) => {
          if (item.active === true) {
            const existingQuantity = parseInt(item.quantity) || 0;
            const newQuantity =
              String(existingQuantity) + String(payloadQuantity);
            return {
              ...item,
              quantity: Number(newQuantity),
            };
          }
          return item;
        });
      }
    },
    resetQTY: (state, action) => {
      const payloadQuantity = parseInt(action.payload);
      if (!isNaN(payloadQuantity)) {
        state.products = state.products.map((item) => {
          if (item.active === true) {
            const existingQuantity = payloadQuantity;
            return {
              ...item,
              quantity: Number(existingQuantity),
            };
          }
          return item;
        });
      }
    },
    deleteQTY: (state, action) => {
      const payloadQuantity = parseInt(action.payload);
      if (!isNaN(payloadQuantity)) {
        state.products = state.products.map((item) => {
          if (item.active === true) {
            const existingQuantity = parseInt(item.quantity) || 0;
            const newQuantity = String(existingQuantity).slice(
              0,
              String(existingQuantity).length - payloadQuantity
            );
            return {
              ...item,
              quantity: Number(newQuantity),
            };
          }
          return item;
        });
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  setActive,
  qtyChange,
  resetQTY,
  deleteQTY,
} = productSlice.actions;
export default productSlice.reducer;
