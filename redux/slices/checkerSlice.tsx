import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface checkerState {
  checkerInfo: {};
  getCheckersByAgent: any;
  success: Boolean;
}

// Define the initial state using that type
let checkerInfoFromLocalStorage: any;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  const userJson: any = localStorage.getItem('checkerInfo');
  checkerInfoFromLocalStorage = localStorage.getItem('checkerInfo')
    ? JSON.parse(userJson)
    : null;
}

const initialState: checkerState = {
  checkerInfo: checkerInfoFromLocalStorage,
  success: checkerInfoFromLocalStorage ? true : false,
  getCheckersByAgent: {},
};
export const registerChecker: any = createAsyncThunk(
  'checker/registerChecker',
  async ({ userName, event, password, token }: any, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        'ticket-checker/',
        { userName, event, password },
        config
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
export const checkerLogin: any = createAsyncThunk(
  'checker/login',
  async ({ userName, password }: any, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        'ticket-checker/login',
        { userName, password },
        config
      );
      if (data) {
        localStorage.setItem('checkerInfo', JSON.stringify(data));
      }
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCheckersByAgent: any = createAsyncThunk(
  'checker/getCheckersByAgent',
  async (token) => {
    const { data } = await axios.get('ticket-checker/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);
export const restrictChecker: any = createAsyncThunk(
  'checker/restrictChecker',
  async ({ token, id }: any) => {
    const { data } = await axios.get('ticket-checker/restrict' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);
export const unRestrictChecker: any = createAsyncThunk(
  'checker/restrictUser',
  async ({ token, id }: any) => {
    const { data } = await axios.get('ticket-checker/restrict' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);
export const checkerSlice = createSlice({
  name: 'checker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    checkerLogout: (state: any) => {
      state.checkerInfo = {};
      state.success = false;
      localStorage.removeItem('checkerInfo');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkerLogin.fulfilled, (state, { payload }) => {
      state.checkerInfo = payload;
      state.success = true;
    });
    builder.addCase(checkerLogin.rejected, (state) => {
      state.success = false;
    });
    builder.addCase(registerChecker.fulfilled, (state, { payload }) => {
      state.checkerInfo = payload;
      state.success = true;
    });
    builder.addCase(registerChecker.rejected, (state) => {
      state.success = false;
    });
    // all event by admin
    builder.addCase(getCheckersByAgent.fulfilled, (state, { payload }) => {
      const getCheckersByAgent = {
        data: payload,
        status: 'success',
      };
      state.getCheckersByAgent = getCheckersByAgent;
    }); // <------- HERE
    builder.addCase(getCheckersByAgent.pending, (state) => {
      const getCheckersByAgent = {
        data: [],
        status: 'loading',
      };
      state.getCheckersByAgent = getCheckersByAgent;
    }); // <------- HERE
    builder.addCase(getCheckersByAgent.rejected, (state) => {
      const getCheckersByAgent = {
        data: [],
        status: 'failed',
      };
      state.getCheckersByAgent = getCheckersByAgent;
    });
  },
});

export const { checkerLogout } = checkerSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default checkerSlice.reducer;
