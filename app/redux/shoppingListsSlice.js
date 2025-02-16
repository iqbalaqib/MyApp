import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShoppingLists, fetchShoppingListItems } from '../api';

// Async thunk for fetching all shopping lists (households)
export const loadShoppingLists = createAsyncThunk(
  'shoppingLists/loadShoppingLists',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchShoppingLists();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching items of a specific shopping list
export const loadShoppingListItems = createAsyncThunk(
  'shoppingLists/loadShoppingListItems',
  async (householdId, { rejectWithValue }) => {
    try {
      const data = await fetchShoppingListItems(householdId);
      console.log('data:', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const shoppingListsSlice = createSlice({
  name: 'shoppingLists',
  initialState: {
    lists: [],              // Stores all shopping lists
    selectedListItems: [],  // Items for the selected shopping list
    selectedHouseholdId: null,  // Currently selected household/shopping list id
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedHouseholdId(state, action) {
      state.selectedHouseholdId = action.payload;
    },
    clearSelectedListItems(state) {
      state.selectedListItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loadShoppingLists actions
      .addCase(loadShoppingLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadShoppingLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(loadShoppingLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle loadShoppingListItems actions
      .addCase(loadShoppingListItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadShoppingListItems.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedListItems = action.payload;
        console.log('selectedListItems:', action.payload);
      })
      .addCase(loadShoppingListItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions for components to dispatch
export const { setSelectedHouseholdId, clearSelectedListItems } = shoppingListsSlice.actions;

// Export the reducer to be added to the store
export default shoppingListsSlice.reducer;
