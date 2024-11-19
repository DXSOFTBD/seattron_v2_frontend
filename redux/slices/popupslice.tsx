import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface popupState {
  data: any;
}

// Define the initial state using that type

const initialState: popupState = {
  data: {
    show: false,
    type: '',
    message: '',
  },
};

// export const getAgentEventById: any = createAsyncThunk(
//   'agent/event',
//   async ({ token, slug }: any) => {
//     const { data } = await axios.get(`events/${slug}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return data.data;
//   }
// );
export const popupSlice = createSlice({
  name: 'popup',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPopup: (state: any, { payload }) => {
      state.data = payload;
    },
  },
});

export const { setPopup } = popupSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default popupSlice.reducer;
