import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface orderState {
  ordersByAgent: {
    data: any;
    status: string;
  };
  getAllAdminOrders: {
    data: any;
    status: string;
  };
  getEventEntryList: {
    data: any;
    status: string;
  };
  getEventOrderList: {
    data: any;
    status: string;
  };
}

// Define the initial state using that type

const initialState: orderState = {
  ordersByAgent: {
    data: [],
    status: '',
  },
  getAllAdminOrders: {
    data: [],
    status: '',
  },
  getEventEntryList: {
    data: [],
    status: '',
  },
  getEventOrderList: {
    data: [],
    status: '',
  },
};

export const ordersByAgent: any = createAsyncThunk(
  'order/ordersByAgent',
  async (token: any) => {
    const { data } = await axios.get('ticket-order/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
export const getAllAdminOrders: any = createAsyncThunk(
  'order/getAllAdminOrders',
  async (token: any) => {
    const { data } = await axios.get('ticket-order/admin', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
// Event entry list
export const getEventEntryList: any = createAsyncThunk(
  'event/getEventEntryList',
  async ({ token, id }: any) => {
    const { data } = await axios.get(`ticket-order/entry/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  }
);
// Event order list
export const getEventOrderList: any = createAsyncThunk(
  'event/getEventOrderList',
  async ({ token, id }: any) => {
    const { data } = await axios.get(`ticket-order/event/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  }
);
export const orderSlice = createSlice({
  name: 'order',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ordersByAgent.fulfilled, (state, { payload }) => {
      const ordersByAgent = {
        data: payload,
        status: 'success',
      };
      state.ordersByAgent = ordersByAgent;
    }); // <------- HERE
    builder.addCase(ordersByAgent.pending, (state) => {
      const ordersByAgent = {
        data: [],
        status: 'loading',
      };
      state.ordersByAgent = ordersByAgent;
    }); // <------- HERE
    builder.addCase(ordersByAgent.rejected, (state) => {
      const ordersByAgent = {
        data: [],
        status: 'failed',
      };
      state.ordersByAgent = ordersByAgent;
    });
    builder.addCase(getAllAdminOrders.fulfilled, (state, { payload }) => {
      const getAllAdminOrders = {
        data: payload,
        status: 'success',
      };
      state.getAllAdminOrders = getAllAdminOrders;
    }); // <------- HERE
    builder.addCase(getAllAdminOrders.pending, (state) => {
      const getAllAdminOrders = {
        data: [],
        status: 'loading',
      };
      state.getAllAdminOrders = getAllAdminOrders;
    }); // <------- HERE
    builder.addCase(getAllAdminOrders.rejected, (state) => {
      const getAllAdminOrders = {
        data: [],
        status: 'failed',
      };
      state.getAllAdminOrders = getAllAdminOrders;
    });
    // Event entry list
    builder.addCase(getEventEntryList.fulfilled, (state, { payload }) => {
      const getEventEntryList = {
        data: payload,
        status: 'success',
      };
      state.getEventEntryList = getEventEntryList;
    });
    builder.addCase(getEventEntryList.pending, (state) => {
      const getEventEntryList = {
        data: [],
        status: 'loading',
      };
      state.getEventEntryList = getEventEntryList;
    });
    builder.addCase(getEventEntryList.rejected, (state) => {
      const getEventEntryList = {
        data: [],
        status: 'failed',
      };
      state.getEventEntryList = getEventEntryList;
    });
    // Event order list
    builder.addCase(getEventOrderList.fulfilled, (state, { payload }) => {
      const getEventOrderList = {
        data: payload,
        status: 'success',
      };
      state.getEventOrderList = getEventOrderList;
    });
    builder.addCase(getEventOrderList.pending, (state) => {
      const getEventOrderList = {
        data: [],
        status: 'loading',
      };
      state.getEventOrderList = getEventOrderList;
    });
    builder.addCase(getEventOrderList.rejected, (state) => {
      const getEventOrderList = {
        data: [],
        status: 'failed',
      };
      state.getEventOrderList = getEventOrderList;
    });
  },
});

export const {} = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default orderSlice.reducer;
