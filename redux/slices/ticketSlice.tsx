import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface TicketState {
  getTicketById: {
    data: any;
    status: string;
  };
}

// Define the initial state using that type

const initialState: TicketState = {
  getTicketById: {
    data: [],
    status: '',
  },
};

export const getTicketById: any = createAsyncThunk(
  'logs/getTicketById',
  async ({ token, id }: any) => {
    const { data } = await axios.get('tickets/' + id, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);

export const ticketSlice = createSlice({
  name: 'tickets',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketById.fulfilled, (state, { payload }) => {
      const getTicketById = {
        data: payload,
        status: 'success',
      };
      state.getTicketById = getTicketById;
    }); // <------- HERE
    builder.addCase(getTicketById.pending, (state) => {
      const getTicketById = {
        data: [],
        status: 'loading',
      };
      state.getTicketById = getTicketById;
    }); // <------- HERE
    builder.addCase(getTicketById.rejected, (state) => {
      const getTicketById = {
        data: [],
        status: 'failed',
      };
      state.getTicketById = getTicketById;
    });
  },
});

export const {} = ticketSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default ticketSlice.reducer;
