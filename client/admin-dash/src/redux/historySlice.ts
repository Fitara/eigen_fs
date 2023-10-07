import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AppDispatch, RootState } from './store';

const base_url = 'http://localhost:3000';

interface Member {
  id: number;
  code: string;
  name: string;
  isPenalized: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Book {
  id: number;
  code: string;
  title: string;
  author: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface History {
  id: number;
  memberId: number;
  bookId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  Member: Member;
  Book: Book;
}

interface HistoryState {
  data: History[];
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  data: [],
  loading: false,
  error: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    fetchHistoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHistorySuccess: (state, action: PayloadAction<History[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHistoryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchHistoryStart,
  fetchHistorySuccess,
  fetchHistoryFailure,
} = historySlice.actions;

export const fetchHistory = () => async (dispatch: AppDispatch) => {
  dispatch(fetchHistoryStart());
  try {
    const response = await axios.get(`${base_url}/histories`); // Ganti dengan URL backend Anda
    dispatch(fetchHistorySuccess(response.data));
  } catch (error) {
    const err = error as AxiosError<unknown>;
    const errorData = (err.response?.data as { message: string });

    if (errorData) {
      dispatch(fetchHistoryFailure(errorData.message));
    } else {
      const errorMessage = 'An error occurred while borrowing the book.';
      dispatch(fetchHistoryFailure(errorMessage));
    }
  }
};

export const selectHistory = (state: RootState) => state.history;

export default historySlice.reducer;
