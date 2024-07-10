import { createSlice } from "@reduxjs/toolkit";
const findex = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return null;
};

const productSlice = createSlice({
  name: "Products",
  initialState: [],
  reducers: {
    showProducts: (state, action) => {
      return action.payload;
    },

    incrementQuantity: (state, action) => {
      let { id } = action.payload;
      let index = findex(state, id);
      if (index !== null)
        state[index].quantity = (state[index].quantity || 1) + 1;
    },

    decrementQuantity: (state, action) => {
      let { id } = action.payload;
      let index = findex(state, id);
      if (index !== null && state[index].quantity > 1)
        state[index].quantity = (state[index].quantity || 1) - 1;
    },

    removeProduct: (state,action)=>{
        let {id}= action.payload;
        return state.filter((product)=>product.id !== id)
    }
  },
});

export const {showProducts, incrementQuantity, decrementQuantity, removeProduct} = productSlice.actions;
export default productSlice.reducer;