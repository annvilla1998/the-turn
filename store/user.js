import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
  resetSuccess: null,
  verificationMessage: { success: null, error: null },
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${email}`);

      if (!response.ok) {
        return rejectWithValue(
          response.status === 404
            ? "User not found"
            : "Failed to fetch user data"
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

export const subscribeUser = createAsyncThunk(
  "user/subscribeUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/subscribe`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        return rejectWithValue("Failed to update subscription");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("Failed to update subscription");
    }
  }
);

export const unsubscribeUser = createAsyncThunk(
  "user/unsubscribeUser",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/unsubscribe`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        return rejectWithValue("Failed to update subscription");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("Failed to update subscription");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (newPassword, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/auth/reset`, {
        newPassword,
      });

      return data.message;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to reset password");
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "user/resendVerificationEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/send-email/${email}?purpose=confirmation`
      );

      if (!response.ok) {
        return rejectWithValue(
          "Failed to send email. Please try again or contact us for help."
        );
      }

      return "Message re-sent. Please check your email.";
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to send verification email"
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to sign up");
      }

      const data = await response.json();

      // Fetch user after successful signup
      dispatch(fetchUser(email));

      return data.message;
    } catch (error) {
      return rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOutReducer(state) {
      state.currentUser = null;
      state.error = null;
      state.resetSuccess = null;
      state.verificationMessage = { success: null, error: null };
    },
    setVerified(state) {
      if (state.currentUser) {
        state.currentUser.verified = true;
      }
    },
    markSubscriptionPromptAsSeen: (state, action) => {
      if (state.currentUser) {
        state.currentUser.hasSeenSubscriptionPrompt = action.payload;
      }
    },
    clearMessages: (state) => {
      state.error = null;
      state.resetSuccess = null;
      state.verificationMessage = { success: null, error: null };
    },
  },
  extraReducers: (builder) => {
    // All addCase calls must come before addMatcher calls
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = {
          ...action.payload,
          hasSeenSubscriptionPrompt: false,
        };
      })
      .addCase(subscribeUser.fulfilled, (state) => {
        state.isLoading = false;
        if (state.currentUser) {
          state.currentUser.subscribed = true;
        }
      })
      .addCase(unsubscribeUser.fulfilled, (state) => {
        state.isLoading = false;
        if (state.currentUser) {
          state.currentUser.subscribed = false;
        }
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetSuccess = action.payload;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verificationMessage = {
          success: action.payload,
          error: null,
        };
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.verificationMessage = {
          success: null,
          error: action.payload,
        };
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.resetSuccess = action.payload;
      })
      // After all addCase calls, we can use addMatcher
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || "An error occurred";
        }
      );
  },
});

export const {
  clearMessages,
  signOutReducer,
  setVerified,
  markSubscriptionPromptAsSeen,
} = userSlice.actions;

export default userSlice.reducer;
