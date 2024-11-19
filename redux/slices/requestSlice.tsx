import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface requestState {
  getAgentRequest: {
    data: any;
    status: string;
  };
  getAdminRequest: {
    data: any;
    status: string;
  };
  getApprovedRequest: {
    data: any;
    status: string;
  };
  getRejectRequest: {
    data: any;
    status: string;
  };
  selectedRequest: string;
}

// Define the initial state using that type

const initialState: requestState = {
  getAgentRequest: {
    data: [],
    status: '',
  },
  getAdminRequest: {
    data: [],
    status: '',
  },
  getApprovedRequest: {
    data: [],
    status: '',
  },
  getRejectRequest: {
    data: [],
    status: '',
  },
  selectedRequest: '',
};

export const getAgentRequest: any = createAsyncThunk(
  'request/getAgentRequest',
  async (token: any) => {
    const { data } = await axios.get('requests/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
export const getAdminRequest: any = createAsyncThunk(
  'request/getAdminRequest',
  async (token: any) => {
    const { data } = await axios.get('requests/admin', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);
export const getApprovedRequest: any = createAsyncThunk(
  'request/getApprovedRequest',
  async (info: any) => {
    // console.log(info);
    const { data } = await axios.get('requests/event/approve/' + info.id, {
      headers: { Authorization: `Bearer ${info.token}` },
    });
    return data;
  }
);
export const getRejectRequest: any = createAsyncThunk(
  'request/getRejectRequest',
  async (details: any) => {
    // console.log(details);
    const { data } = await axios.post(
      'requests/event/reject/' + details.request_id,
      { rejectedReason: details.rejectReason },
      {
        headers: { Authorization: `Bearer ${details.token}` },
      }
    );
    return data;
  }
);

export const requestSlice = createSlice({
  name: 'request',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedRequest: (state: any, { payload }) => {
      state.selectedRequest = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAgentRequest.fulfilled, (state, { payload }) => {
      const getAgentRequest = {
        data: payload,
        status: 'success',
      };
      state.getAgentRequest = getAgentRequest;
    }); // <------- HERE
    builder.addCase(getAgentRequest.pending, (state) => {
      const getAgentRequest = {
        data: [],
        status: 'loading',
      };
      state.getAgentRequest = getAgentRequest;
    }); // <------- HERE
    builder.addCase(getAgentRequest.rejected, (state) => {
      const getAgentRequest = {
        data: [],
        status: 'failed',
      };
      state.getAgentRequest = getAgentRequest;
    });
    builder.addCase(getAdminRequest.fulfilled, (state, { payload }) => {
      const getAdminRequest = {
        data: payload,
        status: 'success',
      };
      state.getAdminRequest = getAdminRequest;
    }); // <------- HERE
    builder.addCase(getAdminRequest.pending, (state) => {
      const getAdminRequest = {
        data: [],
        status: 'loading',
      };
      state.getAdminRequest = getAdminRequest;
    }); // <------- HERE
    builder.addCase(getAdminRequest.rejected, (state) => {
      const getAdminRequest = {
        data: [],
        status: 'failed',
      };
      state.getAdminRequest = getAdminRequest;
    });
    builder.addCase(getApprovedRequest.fulfilled, (state, { payload }) => {
      const getApprovedRequest = {
        data: payload,
        status: 'success',
      };
      state.getApprovedRequest = getApprovedRequest;
    }); // <------- HERE

    builder.addCase(getApprovedRequest.rejected, (state) => {
      const getApprovedRequest = {
        data: [],
        status: 'failed',
      };
      state.getApprovedRequest = getApprovedRequest;
    });
    builder.addCase(getRejectRequest.fulfilled, (state, { payload }) => {
      const getRejectRequest = {
        data: payload,
        status: 'success',
      };
      state.getRejectRequest = getRejectRequest;
    }); // <------- HERE

    builder.addCase(getRejectRequest.rejected, (state) => {
      const getRejectRequest = {
        data: [],
        status: 'failed',
      };
      state.getRejectRequest = getRejectRequest;
    });
  },
});

export const { setSelectedRequest } = requestSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default requestSlice.reducer;
