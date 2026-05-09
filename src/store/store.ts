import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./jwtstorage";

export const store = configureStore({
  // сконфигурирем store
  // подключаем все доступные редюсеры
  reducer: {
    cart: cartSlice,
    user: userSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE); // JWT_PERSISTENT_STATE -> userData
  saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>; // нам нужно то, что оно возвращает - используем утилитарный тип - ReturnType - возвращает состояние

// тип того, что мы можем диспетчить
export type AppDispath = typeof store.dispatch; // в AppDispath будут лежать все наши диспатчи, которые мы в дальнейшем объявим в редюсерах
