import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface agentState {
  agentInfo: {
    name: string;
    email: string;
    token: string;
    logo: string;
  };
  getAllAgentByAdmin: {
    data: any;
    status: string;
  };
  getAgentById: {
    data: any;
    status: string;
  };
  success: Boolean;
}
// Define the initial state using that type
let agentInfoFromStorage: any;

if (typeof window !== 'undefined') {
  // Perform localStorage action
  const userJson: any = localStorage.getItem('agentInfo');
  agentInfoFromStorage = localStorage.getItem('agentInfo')
    ? JSON.parse(userJson)
    : null;
}

const initialState: agentState = {
  agentInfo: agentInfoFromStorage,
  success: agentInfoFromStorage ? true : false,
  getAllAgentByAdmin: {
    data: [],
    status: '',
  },
  getAgentById: {
    data: [],
    status: '',
  },
};

export const agentLogin: any = createAsyncThunk(
  'agent/login',
  async ({ email, password }: any, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        'agents/login',
        { email, password },
        config
      );
      if (data) {
        localStorage.setItem('agentInfo', JSON.stringify(data));
      }
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
export const getAllAgentByAdmin: any = createAsyncThunk(
  'agents/getAllAgentByAdmin',
  async (token: any) => {
    const { data } = await axios.get('agents/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
);
export const getAgentById: any = createAsyncThunk(
  'agents/getAgentById',
  async ({ token, id }: any) => {
    const { data } = await axios.get('agents/' + id, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
);

export const agentSlice = createSlice({
  name: 'agent',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    agentLogout: (state: any) => {
      state.agentInfo = {};
      state.success = false;
      localStorage.removeItem('agentInfo');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(agentLogin.fulfilled, (state, { payload }) => {
      state.agentInfo = payload;
      state.success = true;
    });
    builder.addCase(agentLogin.rejected, (state) => {
      state.success = false;
    });
    builder.addCase(getAllAgentByAdmin.fulfilled, (state, { payload }) => {
      const getAllAgentByAdmin = {
        data: payload,
        status: 'success',
      };
      state.getAllAgentByAdmin = getAllAgentByAdmin;
    }); // <------- HERE
    builder.addCase(getAllAgentByAdmin.pending, (state) => {
      const getAllAgentByAdmin = {
        data: [],
        status: 'loading',
      };
      state.getAllAgentByAdmin = getAllAgentByAdmin;
    }); // <------- HERE
    builder.addCase(getAllAgentByAdmin.rejected, (state) => {
      const getAllAgentByAdmin = {
        data: [],
        status: 'failed',
      };
      state.getAllAgentByAdmin = getAllAgentByAdmin;
    });
    builder.addCase(getAgentById.fulfilled, (state, { payload }) => {
      const getAgentById = {
        data: payload,
        status: 'success',
      };
      state.getAgentById = getAgentById;
    }); // <------- HERE
    builder.addCase(getAgentById.pending, (state) => {
      const getAgentById = {
        data: [],
        status: 'loading',
      };
      state.getAgentById = getAgentById;
    }); // <------- HERE
    builder.addCase(getAgentById.rejected, (state) => {
      const getAgentById = {
        data: [],
        status: 'failed',
      };
      state.getAgentById = getAgentById;
    });
  },
});

export const { agentLogout } = agentSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default agentSlice.reducer;
