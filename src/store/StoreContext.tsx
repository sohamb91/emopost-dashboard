import moment from 'moment';
import { createContext, useEffect, useMemo, useReducer } from 'react';

import { api } from '@/services/api';
import type * as Types from '@/services/api/api.types';

export const StoreContext = createContext({});

const initialState = {
  workSpaces: {
    data: [],
    isLoading: false,
    error: false,
    selectedWorkSpaceId: '',
    random: '',
    channelDetails: {},
    calendarRange: [],
  },
};
const actions = {
  FETCH_WORKSPACES: 'FETCH_WORSPACES',
  FETCHING_WORKSPACES_START: 'FETCHING_WORKSPACES_START',
  FETCHING_WORKSPACES_END: 'FETCHING_WORKSPACES_END',
  UPDATE_WORKSPACES_LIST: 'UPDATE_WORKSPACES_LIST',
  SET_SELECTED_WORSPACE: 'SET_SELECTED_WORSPACE',
  FETCHING_WORKSPACES: 'FETCHING_WORKSPACES',
  SAVE_CHANNEL_DETAILS: 'SAVE_CHANNEL_DETAILS',
  SET_CALENDAR_RANGE: 'SET_CALENDAR_RANGE',
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case actions.SET_CALENDAR_RANGE: {
      const data = action?.data;
      return {
        ...prevState,
        workSpaces: {
          ...prevState.workSpaces,
          calendarRange: [...data],
        },
      };
    }

    case actions.SAVE_CHANNEL_DETAILS: {
      const data = action?.data;
      return {
        ...prevState,
        workSpaces: {
          ...prevState.workSpaces,
          channelDetails: { ...data },
        },
      };
    }
    case actions.FETCHING_WORKSPACES: {
      const status = action?.data;
      return {
        ...prevState,
        workSpaces: {
          ...prevState.workSpaces,
          isLoading: status,
        },
      };
    }

    case actions.UPDATE_WORKSPACES_LIST: {
      const workspaceData = action?.data;
      return {
        ...prevState,
        workSpaces: {
          ...prevState.workSpaces,
          data: workspaceData,
        },
      };
    }

    case actions.SET_SELECTED_WORSPACE: {
      const workspaceId = action?.data;
      return {
        ...prevState,
        workSpaces: {
          ...prevState?.workSpaces,
          selectedWorkSpaceId: workspaceId,
        },
      };
    }

    default:
      return prevState;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => ({
      fetchWorkspaces: async () => {
        dispatch({ type: 'FETCHING_WORKSPACES', data: true });
        try {
          const data = await api.fetchCalendars();
          if (data.kind === 'ok') {
            dispatch({ type: 'UPDATE_WORKSPACES_LIST', data: data?.data });
            dispatch({
              type: 'SET_SELECTED_WORSPACE',
              data: data?.data[0]?._id,
            });
          }
        } catch {
          console.log('an error occurred');
        } finally {
          dispatch({ type: 'FETCHING_WORKSPACES', data: false });
        }
      },
      setSelectedWorkSpaceId: (id: string) => {
        dispatch({ type: 'SET_SELECTED_WORSPACE', data: id });
      },
      saveChannelDetails: (channelData: Types.ChannelSubscription) => {
        dispatch({ type: 'SAVE_CHANNEL_DETAILS', data: { ...channelData } });
      },
      setCalendarDays: (startDate: number, range: number) => {
        const arr = [...new Array(range)].map((_, index) => {
          return {
            start: moment(startDate).add(index, 'days').startOf('day').toDate(),
            end: moment(startDate)
              .add(index + 1, 'days')
              .startOf('day')
              .toDate(),
            date: moment(startDate).add(index, 'days').toDate(),
            UTC: moment(startDate).add(index, 'days').startOf('day').valueOf(),
            platform: 'Loading',
          };
        });
        console.log('arr', arr);
        dispatch({ type: 'SET_CALENDAR_RANGE', data: arr });
      },
      state,
    }),
    [state]
  );

  useEffect(() => {
    (async () => {
      await value.fetchWorkspaces();
    })();
  }, []);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
