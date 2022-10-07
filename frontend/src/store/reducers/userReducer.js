import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import DirectionService from '../../services/DirectionService';
import MarkService from '../../services/MarkService';
import ProfileService from '../../services/ProfileService';

const initialState = {
  isAuth: null,
  user: {},
  isFailed: null,
  isLoading: false,
};

const login = createAsyncThunk('user/login', async (payload, thunkApi) => {
  const { data } = await AuthService.login(payload.email, payload.password);

  return data;
});

const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  const { data } = await AuthService.checkAuth();

  return data;
});

const setReady = createAsyncThunk('user/ready', async () => {
  const { data } = await ProfileService.setReady();

  return data;
});

const uploadPassport = createAsyncThunk(
  'user/uploadPassport',
  async (payload, thunkApi) => {
    const { data } = await ProfileService.uploadPassport(payload);

    return data;
  },
);

const uploadUserInfo = createAsyncThunk(
  'user/uploadUserInfo',
  async (payload, thunkApi) => {
    const { data } = await ProfileService.uploadUserInfo(payload);

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

const createMark = createAsyncThunk(
  'mark/create',
  async (payload, thunkApi) => {
    const { data } = await MarkService.createMark(payload.exam, payload.result);

    return data;
  },
);

const selectDirection = createAsyncThunk(
  'direction/select',
  async (payload, thunkApi) => {
    const { data } = await DirectionService.selectDirection(
      payload.directionId,
    );

    return data;
  },
);

const deselectDirection = createAsyncThunk(
  'direction/deselect',
  async (payload, thunkApi) => {
    const { data } = await DirectionService.deselectDirection(
      payload.directionId,
    );

    return data;
  },
);

const updatePriority = createAsyncThunk(
  'direction/updatePriority',
  async (payload, thunkApi) => {
    const { data } = await DirectionService.updatePriority(
      payload.directionId,
      payload.priority,
    );

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

    builder.addCase(uploadPassport.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(acceptWithCookie.fulfilled, (state, action) => {
      state.user.acceptedWithCookie = true;
    });

    builder.addCase(createMark.fulfilled, (state, action) => {
      state.user.marks = action.payload.marks;
    });

    builder
      .addCase(checkAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;

        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.accessToken);
        state.isFailed = false;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = {};
      });

    builder.addCase(uploadUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(setReady.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(selectDirection.fulfilled, (state, action) => {
      state.user.directions = action.payload.directions;
      state.isFailed = null;
    });

    builder.addCase(deselectDirection.fulfilled, (state, action) => {
      state.user.directions = action.payload.directions;
    });

    builder.addCase(updatePriority.fulfilled, (state, action) => {
      state.user.directions = action.payload.directions;
    });
  },
});

export default userSlice.reducer;
export {
  login,
  logout,
  uploadPassport,
  uploadUserInfo,
  createMark,
  acceptWithCookie,
  checkAuth,
  setReady,
  selectDirection,
  deselectDirection,
  updatePriority,
};
