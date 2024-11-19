import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface logsState {
  getLogsByAgent: {
    data: any;
    status: string;
  };
  getLogsByAdmin: {
    data: any;
    status: string;
  };
  getSystemLogs: {
    data: any;
    status: string;
  };
}

// Define the initial state using that type

const initialState: logsState = {
  getLogsByAgent: {
    data: [],
    status: '',
  },
  getLogsByAdmin: {
    data: [],
    status: '',
  },
  getSystemLogs: {
    data: [],
    status: '',
  },
};

export const getLogsByAgent: any = createAsyncThunk(
  'logs/getLogsByAgent',
  async (token: any) => {
    const { data } = await axios.get('logs/agent', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);
export const getLogsByAdmin: any = createAsyncThunk(
  'logs/getLogsByAdmin',
  async (token: any) => {
    const { data } = await axios.get('logs/admin', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
);
export const getSystemLogs: any = createAsyncThunk(
  'logs/getSystemLogs',
  async (token: any) => {
    const { data } = await axios.get('logs/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
);
// export const getAgentEventById: any = createAsyncThunk(
//   'agent/event',
//   async ({ token, slug }: any) => {
//     const { data } = await axios.get(`events/${slug}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return data.data;
//   }
// );
export const logsSlice = createSlice({
  name: 'logs',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLogsByAgent.fulfilled, (state, { payload }) => {
      const getLogsByAgent = {
        data: payload,
        status: 'success',
      };
      state.getLogsByAgent = getLogsByAgent;
    }); // <------- HERE
    builder.addCase(getLogsByAgent.pending, (state) => {
      const getLogsByAgent = {
        data: [],
        status: 'loading',
      };
      state.getLogsByAgent = getLogsByAgent;
    }); // <------- HERE
    builder.addCase(getLogsByAgent.rejected, (state) => {
      const getLogsByAgent = {
        data: [],
        status: 'failed',
      };
      state.getLogsByAgent = getLogsByAgent;
    });
    builder.addCase(getLogsByAdmin.fulfilled, (state, { payload }) => {
      const getLogsByAdmin = {
        data: payload,
        status: 'success',
      };
      state.getLogsByAdmin = getLogsByAdmin;
    }); // <------- HERE
    builder.addCase(getLogsByAdmin.pending, (state) => {
      const getLogsByAdmin = {
        data: [],
        status: 'loading',
      };
      state.getLogsByAdmin = getLogsByAdmin;
    }); // <------- HERE
    builder.addCase(getLogsByAdmin.rejected, (state) => {
      const getLogsByAdmin = {
        data: [],
        status: 'failed',
      };
      state.getLogsByAdmin = getLogsByAdmin;
    });
    builder.addCase(getSystemLogs.fulfilled, (state, { payload }) => {
      const getSystemLogs = {
        data: payload,
        status: 'success',
      };
      state.getSystemLogs = getSystemLogs;
    }); // <------- HERE
    builder.addCase(getSystemLogs.pending, (state) => {
      const getSystemLogs = {
        data: [],
        status: 'loading',
      };
      state.getSystemLogs = getSystemLogs;
    }); // <------- HERE
    builder.addCase(getSystemLogs.rejected, (state) => {
      const getSystemLogs = {
        data: [],
        status: 'failed',
      };
      state.getSystemLogs = getSystemLogs;
    });
  },
});

export const {} = logsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default logsSlice.reducer;
