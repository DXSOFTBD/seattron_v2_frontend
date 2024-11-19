import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state

interface analyticsState {
  getAgentAnalytics: {
    data: any;
    status: string;
  };
  getAdminAnalytics: {
    data: any;
    status: string;
  };
}

// Define the initial state using that type

const initialState: analyticsState = {
  getAgentAnalytics: {
    data: [],
    status: '',
  },
  getAdminAnalytics: {
    data: [],
    status: '',
  },
};

export const getAgentAnalytics: any = createAsyncThunk(
  'analytics/getAgentAnalytics',
  async (token: any) => {
    const { data } = await axios.get('insights/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
export const getAdminAnalytics: any = createAsyncThunk(
  'analytics/getAdminAnalytics',
  async (token: any) => {
    const { data } = await axios.get('insights/admin', {
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
export const analyticsSlice = createSlice({
  name: 'analytics',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAgentAnalytics.fulfilled, (state, { payload }) => {
      const getAgentAnalytics = {
        data: payload,
        status: 'success',
      };
      state.getAgentAnalytics = getAgentAnalytics;
    }); // <------- HERE
    builder.addCase(getAgentAnalytics.pending, (state) => {
      const getAgentAnalytics = {
        data: [],
        status: 'loading',
      };
      state.getAgentAnalytics = getAgentAnalytics;
    }); // <------- HERE
    builder.addCase(getAgentAnalytics.rejected, (state) => {
      const getAgentAnalytics = {
        data: [],
        status: 'failed',
      };
      state.getAgentAnalytics = getAgentAnalytics;
    });
    // admin analytics
    builder.addCase(getAdminAnalytics.fulfilled, (state, { payload }) => {
   
      const getAdminAnalytics = {
        data: payload,
        status: 'success',
      };
      state.getAdminAnalytics = getAdminAnalytics;
    }); // <------- HERE
    builder.addCase(getAdminAnalytics.pending, (state) => {
      const getAdminAnalytics = {
        data: [],
        status: 'loading',
      };
      state.getAdminAnalytics = getAdminAnalytics;
    }); // <------- HERE
    builder.addCase(getAdminAnalytics.rejected, (state) => {
      const getAdminAnalytics = {
        data: [],
        status: 'failed',
      };
      state.getAdminAnalytics = getAdminAnalytics;
    });
  },
});

export const {} = analyticsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default analyticsSlice.reducer;
