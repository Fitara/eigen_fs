// membersSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from './store';
import axios from 'axios';

const base_url = 'http://localhost:3000';

interface Member {
  id: number;
  code: string;
  name: string;
  isPenalized: boolean;
  BookHistories: [];
}

interface MembersState {
  data: Member[];
  loading: boolean;
  error: string | null;
}

const initialState: MembersState = {
  data: [],
  loading: false,
  error: null,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    fetchMembersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMembersSuccess: (state, action: PayloadAction<Member[]>) => {
      state.loading = false;
      state.data = action.payload;
       console.log('fetchMembersSuccess payload:', action.payload);
    },
    fetchMembersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMembersStart,
  fetchMembersSuccess,
  fetchMembersFailure,
} = membersSlice.actions;

export const fetchMembers = () => async (dispatch: AppDispatch) => {
  dispatch(fetchMembersStart());
  try {
    const response = await axios.get(`${base_url}/members`);
    dispatch(fetchMembersSuccess(response.data));
    
  } catch (error) {
    dispatch(fetchMembersFailure('An error occurred while fetching members.'));
  }
};

export const fetchMemberById = (memberId: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchMembersStart());
  try {
    const response = await axios.get(`${base_url}/members/${memberId}`);
    dispatch(fetchMembersSuccess(response.data));
    
    return response.data;
    
  } catch (error) {
    dispatch(fetchMembersFailure('An error occurred while fetching member data.'));
  }
};

export const selectMembers = (state: RootState) => state.members;

export default membersSlice.reducer;
