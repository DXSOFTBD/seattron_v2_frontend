import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/axios/config';
// Define a type for the slice state
interface Data {
  data: any;
}

interface agentState {
  getAgentEvents: {
    data: any;
    status: string;
  };

  agentEventById: {
    data: any;
    status: string;
  };
  getAdminEvents: {
    data: any;
    status: string;
  };
  getAdminEventById: {
    data: any;
    status: string;
  };
  getUpcomingEvents: {
    data: any;
    status: string;
  };
  getFeaturedEvents: {
    data: any;
    status: string;
  };
  getPastEvents: {
    data: any;
    status: string;
  };
  getEventBySlug: {
    data: any;
    status: string;
  };
  getEventQuota: {
    data: any;
    status: string;
  };
  getEventSeatQuota: {
    data: any;
    status: string,
  },
}

const initialState: agentState = {
  getAgentEvents: {
    data: [],
    status: '',
  },

  agentEventById: {
    data: [],
    status: '',
  },
  getAdminEvents: {
    data: [],
    status: '',
  },
  getAdminEventById: {
    data: [],
    status: '',
  },
  getUpcomingEvents: {
    data: [],
    status: '',
  },
  getFeaturedEvents: {
    data: [],
    status: '',
  },
  getPastEvents: {
    data: [],
    status: '',
  },
  getEventBySlug: {
    data: [],
    status: '',
  },
  getEventQuota: {
    data: [],
    status: '',
  },
  getEventSeatQuota: {
    data: [],
    status: '',
  },
};

export const getUpcomingEvents: any = createAsyncThunk(
  'event/getUpcomingEvents',
  async () => {
    const { data } = await axios.get('events/upcoming', {});

    return data.data;
  }
);
export const getFeaturedEvents: any = createAsyncThunk(
  'event/getFeaturedEvents',
  async () => {
    const { data } = await axios.get('events/upcoming', {});

    return data.data;
  }
);
export const getPastEvents: any = createAsyncThunk(
  'event/getPastEvents',
  async () => {
    const { data } = await axios.get('events/past', {});
    return data.data;
  }
);
export const getEventBySlug: any = createAsyncThunk(
  'event/getEventBySlug',
  async (slug: any) => {
    const { data } = await axios.get(`events/upcoming/${slug}`, {});
 
    return data.data;
  }
);

export const getAgentEvents: any = createAsyncThunk(
  'event/getAgentEvents',
  async (token: any) => {
    const { data } = await axios.get('events/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
export const getAdminEvents: any = createAsyncThunk(
  'event/getAdminEvents',
  async (token: any) => {
    const { data } = await axios.get('events/admin/events', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  }
);
export const getAgentEventById: any = createAsyncThunk(
  'event/getAgentEventById',
  async ({ token, slug }: any) => {
    const { data } = await axios.get(`events/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
export const getAdminEventById: any = createAsyncThunk(
  'event/getAdminEventById',
  async ({ token, slug }: any) => {
    const { data } = await axios.get(`events/admin/events/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
export const getEventQuota: any = createAsyncThunk(
  'event/getEventQuota',
  async (token: any) => {
    const { data } = await axios.get(`events/quota/event`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
export const getEventSeatQuota: any = createAsyncThunk(
  'event/getEventSeatQuota',
  async (token: any) => {
    const { data } = await axios.get(`events/quota/event-seat`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.data;
  }
);
export const eventSlice = createSlice({
  name: 'event',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // agent all events
    builder.addCase(getAgentEvents.fulfilled, (state, { payload }) => {
      const getAgentEvents = {
        data: payload,
        status: 'success',
      };
      state.getAgentEvents = getAgentEvents;
    }); // <------- HERE
    builder.addCase(getAgentEvents.pending, (state) => {
      const getAgentEvents = {
        data: [],
        status: 'loading',
      };
      state.getAgentEvents = getAgentEvents;
    }); // <------- HERE
    builder.addCase(getAgentEvents.rejected, (state) => {
      const getAgentEvents = {
        data: [],
        status: 'failed',
      };
      state.getAgentEvents = getAgentEvents;
    });
    // all event by admin
    builder.addCase(getAdminEvents.fulfilled, (state, { payload }) => {
      const getAdminEvents = {
        data: payload,
        status: 'success',
      };
      state.getAdminEvents = getAdminEvents;
    }); // <------- HERE
    builder.addCase(getAdminEvents.pending, (state) => {
      const getAdminEvents = {
        data: [],
        status: 'loading',
      };
      state.getAdminEvents = getAdminEvents;
    }); // <------- HERE
    builder.addCase(getAdminEvents.rejected, (state) => {
      const getAdminEvents = {
        data: [],
        status: 'failed',
      };
      state.getAdminEvents = getAdminEvents;
    });
    builder.addCase(getAgentEventById.fulfilled, (state, { payload }) => {
      const agentEventById = {
        data: payload,
        status: 'success',
      };
      state.agentEventById = agentEventById;
    }); // <------- HERE
    builder.addCase(getAgentEventById.pending, (state) => {
      const agentEventById = {
        data: [],
        status: 'loading',
      };
      state.agentEventById = agentEventById;
    }); // <------- HERE
    builder.addCase(getAgentEventById.rejected, (state) => {
      const agentEventById = {
        data: [],
        status: 'failed',
      };
      state.agentEventById = agentEventById;
    });
    // admin single event call
    builder.addCase(getAdminEventById.fulfilled, (state, { payload }) => {
      const getAdminEventById = {
        data: payload,
        status: 'success',
      };
      state.getAdminEventById = getAdminEventById;
    }); // <------- HERE
    builder.addCase(getAdminEventById.pending, (state) => {
      const getAdminEventById = {
        data: [],
        status: 'loading',
      };
      state.getAdminEventById = getAdminEventById;
    }); // <------- HERE
    builder.addCase(getAdminEventById.rejected, (state) => {
      const getAdminEventById = {
        data: [],
        status: 'failed',
      };
      state.getAdminEventById = getAdminEventById;
    });
    // all upcoming events
    builder.addCase(getUpcomingEvents.fulfilled, (state, { payload }) => {
      const getUpcomingEvents = {
        data: payload,
        status: 'success',
      };
      state.getUpcomingEvents = getUpcomingEvents;
    }); // <------- HERE
    builder.addCase(getUpcomingEvents.pending, (state) => {
      const getUpcomingEvents = {
        data: [],
        status: 'loading',
      };
      state.getUpcomingEvents = getUpcomingEvents;
    }); // <------- HERE
    builder.addCase(getUpcomingEvents.rejected, (state) => {
      const getUpcomingEvents = {
        data: [],
        status: 'failed',
      };
      state.getUpcomingEvents = getUpcomingEvents;
    });
    // all featured events
    builder.addCase(getFeaturedEvents.fulfilled, (state, { payload }) => {
      const getFeaturedEvents = {
        data: payload,
        status: 'success',
      };
      state.getFeaturedEvents = getFeaturedEvents;
    }); // <------- HERE
    builder.addCase(getFeaturedEvents.pending, (state) => {
      const getFeaturedEvents = {
        data: [],
        status: 'loading',
      };
      state.getFeaturedEvents = getFeaturedEvents;
    }); // <------- HERE
    builder.addCase(getFeaturedEvents.rejected, (state) => {
      const getFeaturedEvents = {
        data: [],
        status: 'failed',
      };
      state.getFeaturedEvents = getFeaturedEvents;
    });
    // all past events
    builder.addCase(getPastEvents.fulfilled, (state, { payload }) => {
      const getPastEvents = {
        data: payload,
        status: 'success',
      };
      state.getPastEvents = getPastEvents;
    }); // <------- HERE
    builder.addCase(getPastEvents.pending, (state) => {
      const getPastEvents = {
        data: [],
        status: 'loading',
      };
      state.getPastEvents = getPastEvents;
    }); // <------- HERE
    builder.addCase(getPastEvents.rejected, (state) => {
      const getPastEvents = {
        data: [],
        status: 'failed',
      };
      state.getPastEvents = getPastEvents;
    });
    // get a event
    builder.addCase(getEventBySlug.fulfilled, (state, { payload }) => {
      const getEventBySlug = {
        data: payload,
        status: 'success',
      };
      state.getEventBySlug = getEventBySlug;
    }); // <------- HERE
    builder.addCase(getEventBySlug.pending, (state) => {
      const getEventBySlug = {
        data: [],
        status: 'loading',
      };
      state.getEventBySlug = getEventBySlug;
    }); // <------- HERE
    builder.addCase(getEventBySlug.rejected, (state) => {
      const getEventBySlug = {
        data: [],
        status: 'failed',
      };
      state.getEventBySlug = getEventBySlug;
    });
    // get a event quota
    builder.addCase(getEventQuota.fulfilled, (state, { payload }) => {
      const getEventQuota = {
        data: payload,
        status: 'success',
      };
      state.getEventQuota = getEventQuota;
    }); // <------- HERE
    builder.addCase(getEventQuota.pending, (state) => {
      const getEventQuota = {
        data: [],
        status: 'loading',
      };
      state.getEventQuota = getEventQuota;
    }); // <------- HERE
    builder.addCase(getEventQuota.rejected, (state) => {
      const getEventQuota = {
        data: [],
        status: 'failed',
      };
      state.getEventQuota = getEventQuota;
    });
    // get a event seat
    builder.addCase(getEventSeatQuota.fulfilled, (state, { payload }) => {
      const getEventSeatQuota = {
        data: payload,
        status: 'success',
      };
      state.getEventSeatQuota = getEventSeatQuota;
    }); // <------- HERE
    builder.addCase(getEventSeatQuota.pending, (state) => {
      const getEventSeatQuota = {
        data: [],
        status: 'loading',
      };
      state.getEventSeatQuota = getEventSeatQuota;
    }); // <------- HERE
    builder.addCase(getEventSeatQuota.rejected, (state) => {
      const getEventSeatQuota = {
        data: [],
        status: 'failed',
      };
      state.getEventSeatQuota = getEventSeatQuota;
    });
  },
});

export const { } = eventSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default eventSlice.reducer;
