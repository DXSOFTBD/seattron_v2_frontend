import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface notificationState {
  notificationByAgent: {
    data: any;
    status: string;
  };
  notificationByAdmin: {
    data: any;
    status: string;
  };
}

// Define the initial state using that type

const initialState: notificationState = {
  notificationByAgent: {
    data: [],
    status: '',
  },
  notificationByAdmin: {
    data: [],
    status: '',
  },
};

export const notificationByAgent: any = createAsyncThunk(
  'notification/notificationByAgent',
  async (token: any) => {
    const { data } = await axios.get('notifications/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);
export const notificationByAdmin: any = createAsyncThunk(
  'notification/notificationByAdmin',
  async (token: any) => {
    const data = await axios.get('notifications/admin', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
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
export const notificationSlice = createSlice({
  name: 'notification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(notificationByAgent.fulfilled, (state, { payload }) => {
      const notificationByAgent = {
        data: payload,
        status: 'success',
      };
      state.notificationByAgent = notificationByAgent;
    }); // <------- HERE
    builder.addCase(notificationByAgent.pending, (state) => {
      const notificationByAgent = {
        data: [],
        status: 'loading',
      };
      state.notificationByAgent = notificationByAgent;
    }); // <------- HERE
    builder.addCase(notificationByAgent.rejected, (state) => {
      const notificationByAgent = {
        data: [],
        status: 'failed',
      };
      state.notificationByAgent = notificationByAgent;
    });
    builder.addCase(notificationByAdmin.fulfilled, (state, { payload }) => {
      const notificationByAdmin = {
        data: payload,
        status: 'success',
      };
      state.notificationByAdmin = notificationByAdmin;
    }); // <------- HERE
    builder.addCase(notificationByAdmin.pending, (state) => {
      const notificationByAdmin = {
        data: [],
        status: 'loading',
      };
      state.notificationByAdmin = notificationByAdmin;
    }); // <------- HERE
    builder.addCase(notificationByAdmin.rejected, (state) => {
      const notificationByAdmin = {
        data: [],
        status: 'failed',
      };
      state.notificationByAdmin = notificationByAdmin;
    });
  },
});

export const {} = notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default notificationSlice.reducer;
