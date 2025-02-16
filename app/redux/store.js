import { configureStore } from '@reduxjs/toolkit';
import shoppingListsReducer from './shoppingListsSlice';

const store = configureStore({
  reducer: {
    shoppingLists: shoppingListsReducer,
  },
});

export default store;
