import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface adminState {
  adminInfo: {
    name: string;
    email: string;
    token: string;
    logo: string;
  };

  success: Boolean;
}

// Define the initial state using that type
let adminInfoFromStorage: any;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  const userJson: any = localStorage.getItem('adminInfo');
  adminInfoFromStorage = localStorage.getItem('adminInfo')
    ? JSON.parse(userJson)
    : null;
}

const initialState: adminState = {
  adminInfo: adminInfoFromStorage,
  success: adminInfoFromStorage ? true : false,
};
export const adminLogin: any = createAsyncThunk(
  'admin/login',
  async ({ email, password }: any, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        'admins/login',
        { email, password },
        config
      );

      if (data) {
        localStorage.setItem('adminInfo', JSON.stringify(data));
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    adminLogout: (state: any) => {
      state.adminInfo = {};
      state.success = false;
      localStorage.removeItem('adminInfo');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, { payload }) => {
      state.adminInfo = payload;
      state.success = true;
    });
    builder.addCase(adminLogin.rejected, (state) => {
      state.success = false;
    });
  },
});

export const { adminLogout } = adminSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default adminSlice.reducer;
