import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface lineupState {
  getEventLineup: {
    data: any;
    status: string;
  };
  getEventLineupByAdmin: {
    data: any;
    status: string;
  };
  getSystemLineup: {
    data: any;
    status: string;
  };
}

// Define the initial state using that type

const initialState: lineupState = {
  getEventLineup: {
    data: [],
    status: '',
  },
  getEventLineupByAdmin: {
    data: [],
    status: '',
  },
  getSystemLineup: {
    data: [],
    status: '',
  },
};

export const getEventLineup: any = createAsyncThunk(
  'lineup/getEventLineup',
  async ({ token, eventId }: any) => {
    const { data } = await axios.get('events/line-up/' + eventId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data
  }
);
export const getEventLineupByAdmin: any = createAsyncThunk(
  'lineup/getEventLineupByAdmin',
  async (token: any) => {
    const { data } = await axios.get('lineup/admin', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
);
export const getSystemLineup: any = createAsyncThunk(
  'lineup/getSystemLineup',
  async (token: any) => {
    const { data } = await axios.get('lineup/', {
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
export const lineupSlice = createSlice({
  name: 'lineup',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventLineup.fulfilled, (state, { payload }) => {
      const getEventLineup = {
        data: payload,
        status: 'success',
      };
      state.getEventLineup = getEventLineup;
    }); // <------- HERE
    builder.addCase(getEventLineup.pending, (state) => {
      const getEventLineup = {
        data: [],
        status: 'loading',
      };
      state.getEventLineup = getEventLineup;
    }); // <------- HERE
    builder.addCase(getEventLineup.rejected, (state) => {
      const getEventLineup = {
        data: [],
        status: 'failed',
      };
      state.getEventLineup = getEventLineup;
    });
    builder.addCase(getEventLineupByAdmin.fulfilled, (state, { payload }) => {
      const getEventLineupByAdmin = {
        data: payload,
        status: 'success',
      };
      state.getEventLineupByAdmin = getEventLineupByAdmin;
    }); // <------- HERE
    builder.addCase(getEventLineupByAdmin.pending, (state) => {
      const getEventLineupByAdmin = {
        data: [],
        status: 'loading',
      };
      state.getEventLineupByAdmin = getEventLineupByAdmin;
    }); // <------- HERE
    builder.addCase(getEventLineupByAdmin.rejected, (state) => {
      const getEventLineupByAdmin = {
        data: [],
        status: 'failed',
      };
      state.getEventLineupByAdmin = getEventLineupByAdmin;
    });
    builder.addCase(getSystemLineup.fulfilled, (state, { payload }) => {
      const getSystemLineup = {
        data: payload,
        status: 'success',
      };
      state.getSystemLineup = getSystemLineup;
    }); // <------- HERE
    builder.addCase(getSystemLineup.pending, (state) => {
      const getSystemLineup = {
        data: [],
        status: 'loading',
      };
      state.getSystemLineup = getSystemLineup;
    }); // <------- HERE
    builder.addCase(getSystemLineup.rejected, (state) => {
      const getSystemLineup = {
        data: [],
        status: 'failed',
      };
      state.getSystemLineup = getSystemLineup;
    });
  },
});

export const { } = lineupSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default lineupSlice.reducer;
