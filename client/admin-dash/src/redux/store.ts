import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import memberReducer from './memberSlice';
import historyReducer from './historySlice'

const store = configureStore({
  reducer: {
      books: booksReducer,
      members: memberReducer,
      history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
