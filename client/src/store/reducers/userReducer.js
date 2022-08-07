import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import ProfileService from '../../services/ProfileService';
import parseRefreshTokenFromCookie from '../../utils/parseRefreshTokenFromCookie';

const initialState = {
  isAuth: Boolean(parseRefreshTokenFromCookie()),
  user: JSON.parse(localStorage.getItem('user')),
  isFailed: null,
};

const login = createAsyncThunk('user/login', async (payload, thunkApi) => {
  const { data } = await AuthService.login(payload.email, payload.password);

  return data;
});

const uploadPassport = createAsyncThunk(
  'user/uploadPassport',
  async (payload, thunkApi) => {
    const { data } = await ProfileService.uploadPassport(payload);

    return data;
  },
);

const logout = createAsyncThunk('user/logout', async (payload, thunkApi) => {
  await AuthService.logout();
  localStorage.clear();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.accessToken);
      state.isFailed = false;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
      state.user = {};
      state.isFailed = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isFailed = true;
    });

    builder.addCase(uploadPassport.fulfilled, (state, action) => {
      state.user.isVerified = true;
    });
  },
});

export default userSlice.reducer;
export { login, logout, uploadPassport };
