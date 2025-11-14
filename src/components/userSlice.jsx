// src/features/user/userSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { API } from "../config/api";

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Helper: check token validity synchronously
const checkTokenValidity = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }
    // Return only useful fields
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    localStorage.removeItem('token');
    return null;
  }
};

// Initialize state from localStorage
const token = localStorage.getItem('token');
const decodedUser = token ? checkTokenValidity(token) : null;

const initialState = {
  user: decodedUser || null,
  token: token || null,
  isAuthenticated: !!decodedUser,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    restoreSession: (state) => {
      const token = localStorage.getItem('token');
      const decoded = token ? checkTokenValidity(token) : null;
      if (decoded) {
        state.user = decoded;
        state.token = token;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;

        const decoded = jwtDecode(action.payload.token);
        state.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        };

        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, restoreSession } = userSlice.actions;
export default userSlice.reducer;
