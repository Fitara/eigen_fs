// booksSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AppDispatch, RootState } from './store';

const base_url = 'http://localhost:3000';

interface Book {
  id: number;
  code: string;
  title: string;
  author: string;
  stock: number;
}

interface BooksState {
  data: Book[];
  loading: boolean;
  error: string | null;
  borrowSuccessMessage: string | null;
  returnSuccessMessage: string | null;
}

const initialState: BooksState = {
  data: [],
  loading: false,
  error: null,
  borrowSuccessMessage: null,
  returnSuccessMessage: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action: PayloadAction<Book[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchBooksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    borrowBookStart: (state) => {
      state.loading = true;
      state.error = null;
      state.borrowSuccessMessage = null;
    },
    borrowBookSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.borrowSuccessMessage = action.payload;
    },
    borrowBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    returnBookStart: (state) => {
      state.loading = true;
      state.error = null;
      state.returnSuccessMessage = null;
    },
    returnBookSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.returnSuccessMessage = action.payload;
    },
    returnBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  borrowBookStart,
  borrowBookSuccess,
  borrowBookFailure,
  returnBookStart,
  returnBookSuccess,
  returnBookFailure,
} = booksSlice.actions;

export const fetchBooks = () => async (dispatch: AppDispatch) => {
  dispatch(fetchBooksStart());
  try {
    const response = await axios.get(`${base_url}/books`);
    dispatch(fetchBooksSuccess(response.data));
  } catch (error) {
    const err = error as AxiosError<unknown>;
    const errorData = (err.response?.data as { message: string });

    if (errorData) {
      dispatch(borrowBookFailure(errorData.message));
    } else {
      const errorMessage = 'An error occurred while borrowing the book.';
      dispatch(borrowBookFailure(errorMessage));
    }
  }
};

export const borrowBook = (bookId: number, memberId: number) => async (
  dispatch: AppDispatch
) => {
  dispatch(borrowBookStart());
  try {
    const response = await axios.post(
      `${base_url}/books/${bookId}/borrow/${memberId}`
    );
    dispatch(borrowBookSuccess(response.data.message));
    dispatch(fetchBooks());
  } catch (error) {
    const err = error as AxiosError<unknown>;
    const errorData = (err.response?.data as { message: string });

    if (errorData) {
      dispatch(borrowBookFailure(errorData.message));
    } else {
      const errorMessage = 'An error occurred while borrowing the book.';
      dispatch(borrowBookFailure(errorMessage));
    }
  }
};

export const returnBook = (bookId: number, memberId: number) => async (
  dispatch: AppDispatch
) => {
  dispatch(returnBookStart());
  try {
    const response = await axios.post(
      `${base_url}/books/${bookId}/return/${memberId}`
    );
    dispatch(returnBookSuccess(response.data.message));
    dispatch(fetchBooks());
  } catch (error) {
    const err = error as AxiosError<unknown>;
    const errorData = (err.response?.data as { message: string });

    if (errorData) {
      dispatch(returnBookFailure(errorData.message));
    } else {
      const errorMessage = 'An error occurred while borrowing the book.';
      dispatch(borrowBookFailure(errorMessage));
    }
  }
};

export const selectBooks = (state: RootState) => state.books;
export default booksSlice.reducer;