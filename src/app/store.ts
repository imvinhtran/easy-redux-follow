import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/postSlice'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;