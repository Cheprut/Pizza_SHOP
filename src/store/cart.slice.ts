import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./jwtstorage";
export const CART_PERSISTENT_STATE = "cartData";

// нам нужно хранить в корзине id товара и количество
export interface CartItem {
  id: number;
  count: number;
}
export interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      // нам нужно только число
      // если такой товар есть, то увеличим его quantity на 1
      const existed = state.items.find((i) => i.id === action.payload); // existed может быть, а может не быть
      if (!existed) {
        // если товара нет в корзине, то добавим в стейт
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      // если товар есть в корзине - увеличим его count на 1
      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i; // остальные товары просто вернем
      });
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    decrease: (state, action: PayloadAction<number>) => {
      // если мы нашли такой товар в корзине, то должны уменьшить count на 1
      const existed = state.items.find((i) => i.id === action.payload); // existed может быть, а может не быть
      if (!existed) {
        return;
      }
      // если количество товара больше 1, уменьшаем его на 1
      if (existed.count > 1) {
        existed.count -= 1;
      } else {
        // если количество товара 1 или меньше, удаляем товар из корзины
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    increase: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        return;
      }
      existed.count += 1;
    },
    clean: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, decrease, increase, clean } =
  cartSlice.actions;

export default cartSlice.reducer;
