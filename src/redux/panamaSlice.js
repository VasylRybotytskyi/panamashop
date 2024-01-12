import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  favoriteData: [],
  userInfo: null,
  status: "idle",
  error: null,
};

export const panamaSlice = createSlice({
  name: "panama",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity, sizes } = action.payload;
      const existingItem = state.productData.find(
        (item) => item.id === id && item.sizes === sizes
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.productData.push({ ...action.payload });
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },

    incrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    addToFavorite: (state, action) => {
      const {
        id,
        title,
        images,
        price,
        quantity,
        description,
        favorite,
        discount,
        category,
        sizes,
      } = action.payload;
      const existingItemIndex = state.favoriteData.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        // Якщо елемент вже існує, видаляємо його
        state.favoriteData.splice(existingItemIndex, 1);
      } else {
        // Якщо елемент не існує, додаємо його
        state.favoriteData.push({
          id,
          title,
          images,
          price,
          quantity,
          description,
          favorite: true,
          discount,
          category,

          sizes,
        });
      }
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  incrementQuantity,
  decrementQuantity,
  addUser,
  removeUser,
  addToFavorite,
} = panamaSlice.actions;
export default panamaSlice.reducer;
