import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';

export const login: any = createAsyncThunk(
  'user/login',
  async ({ email, password }: any, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        'users/login',
        { email, password },
        config
      );
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
export const register: any = createAsyncThunk( 
  'user/register',
  async ({ name, email, password }: any, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        'users',
        { name, email, password },
        config
      );
      if (data) {
        localStorage.setItem('userInfo', data);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const userByAdmin: any = createAsyncThunk(
  'user/userByAdmin',
  async (token: any) => {
    const { data } = await axios.get('user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);
// Define a type for the slice state
interface userState {
  userInfo: {
    name: String;
    email: String;
    token: String;
  };
  success: Boolean;
  userByAdmin: any;
}

// Define the initial state using that type
let userInfoFromStorage: any;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  const userJson: any = localStorage.getItem('userInfo');
  userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(userJson)
    : null;
}

const initialState: userState = {
  userInfo: userInfoFromStorage,
  success: userInfoFromStorage ? true : false,
  userByAdmin: [],
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state: any) => {
      state.userInfo = {};
      state.success = false;
      localStorage.removeItem('userInfo');
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.success = true;
      state.userInfo = payload;
    }); // <------- HERE

    builder.addCase(login.rejected, (state) => {
      state.success = false;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.success = true;
      state.userInfo = payload;
    }); // <------- HERE

    builder.addCase(register.rejected, (state) => {
      state.success = false;
    });
  },
});

export const { logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer;
