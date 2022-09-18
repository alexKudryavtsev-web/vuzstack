import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SettingsService from '../../services/SettingsService';

const initialState = {
  exams: [],
  maxAmountDirection: 0
};

const readSettings = createAsyncThunk('settings/readSettings', async () => {
  const { data } = await SettingsService.readSettings();

  return data;
});


const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readSettings.fulfilled, (state, action) => {
        state.exams = action.payload.exams;
        state.maxAmountDirection = action.payload.maxAmountDirection;
      });
  },
});

export default settingsSlice.reducer;
export {
  readSettings
};
