import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import MarkService from '../../services/MarkService';
import ProfileService from '../../services/ProfileService';

const userFromLocalStorate = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isAuth: Boolean(userFromLocalStorate),
  user: userFromLocalStorate,
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

const acceptWithCookie = createAsyncThunk(
  'user/acceptedWithCookie',
  async (payload, thunkApi) => {
    await ProfileService.acceptWithCookie();
  },
);

const uploadMarks = createAsyncThunk(
  'user/marks',
  async (payload, thunkApi) => {
    const { data } = await ProfileService.uploadMarks();
    return data;
  },
);

const createMark = createAsyncThunk(
  'mark/create',
  async (payload, thunkApi) => {
    const { data } = await MarkService.createMark(payload.exam, payload.result);

    return data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;

        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.accessToken);
        state.isFailed = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isFailed = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuth = false;
        state.user = {};
        state.isFailed = null;
      });

    builder
      .addCase(uploadPassport.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(uploadMarks.fulfilled, (state, action) => {
        state.user = action.payload;
      });

    builder.addCase(acceptWithCookie.fulfilled, (state, action) => {
      state.user.acceptedWithCookie = true;
    });

    builder.addCase(createMark.fulfilled, (state, action) => {
      state.user.marks = action.payload.marks;
    });
  },
});

export default userSlice.reducer;
export {
  login,
  logout,
  uploadPassport,
  uploadMarks,
  createMark,
  acceptWithCookie,
};
