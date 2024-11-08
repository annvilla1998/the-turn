import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutReducer(state) {
      state.currentUser = null;
    },
    setVerified(state) {
      state.currentUser.verified = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload; // This sets the user data in the state
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user data';
      });
  },
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (email) => {
  try {
    const response = await fetch(`/api/users/${email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    console.log('Fetched user data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchUser thunk:', error);
    return rejectWithValue(error.message);
  }
});

export const { signOutReducer, setVerified } = userSlice.actions;
export default userSlice.reducer;
