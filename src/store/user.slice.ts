import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProfile } from "../interfaces/user.interface";
import { loadState } from "./jwtstorage";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../api/api";
import type { LoginResponse } from "../interfaces/auth.interface";
import type { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export const register = createAsyncThunk(
  "user/register",
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name,
        },
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.response?.data.message;
      }
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw Array.isArray(e.response?.data.message)
          ? e.response?.data.message[0]
          : e.response?.data.message;
      }
    }
  },
);

export const getProfile = createAsyncThunk<
  IProfile,
  void,
  { state: RootState }
>(
  "user/getProfile", // typePrefix
  async (_, thunkApi) => {
    // // payloadCreator
    // thunkApi - это Api внтури thunk, позволяющий получить доступ к общему состоянию Redux - для этого мы типизируем createAsyncThunk, он возвращает профайл createAsyncThunk<Profile>
    // void - аргументы не нужны
    // и передаем состояние - { state: RootState }
    // первый аргумент - без параметров (_,)
    // получим jwt
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  },
);

export interface UserPersistantState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  profile?: IProfile;
}

const initialState: UserState = {
  jwt: loadState<UserPersistantState>(JWT_PERSISTENT_STATE)?.jwt ?? null, // если ключа нет, то будет null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.jwt = null;
      state.profile = undefined;
    },

    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    // builder позволяет добавить кейсы для каждой из асинхронной операции
    builder.addCase(login.fulfilled, (state, action) => {
      // action можно не типизировать, так как он приймет сразу правильный вид
      if (!action.payload) {
        // если нет payload
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      // action можно не типизировать, так как он приймет сразу правильный вид
      if (!action.payload) {
        // если нет payload
        return;
      }
      state.jwt = action.payload.access_token;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;

export const { logOut, clearLoginError, clearRegisterError } =
  userSlice.actions;
