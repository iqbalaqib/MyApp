// File: app/api.js

import axios from 'axios';
import { Buffer } from 'buffer';

const BASE_URL = 'https://groshapp.com/test';
const USERNAME = 'john@groshapp.com';
const PASSWORD = 'Jd1234';

// Encode credentials for Basic Auth
// const authHeader = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')}`;
const authHeader = 'Basic am9obkBncm9zaGFwcC5jb206SmQxMjM0';
// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: authHeader,
    'Content-Type': 'application/json',
  },
});

/**
 * Helper function to handle Grosh API error codes.
 * @param {Object} error - The error object from Axios.
 * @throws Will throw an Error with a descriptive message.
 */
function handleGroshApiError(error) {
  // If we got an HTTP response (error.response is defined),
  // check the status code for Grosh-specific errors.
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 401:
        throw new Error('Unauthorized: Please provide credentials');
      case 403:
        throw new Error('Forbidden: You do not have access to this Data lists');
      case 404:
        throw new Error('Not Found: Data not found');
      default:
        // For any other HTTP status, throw the original error
        throw new Error(error.response.data?.message || error.message);
    }
  } else {
    // If error.response is not defined (e.g., network error),
    // throw the original error or a fallback message
    throw new Error(error.message || 'An unknown error occurred');
  }
}

/**
 * Fetch all shopping lists (households)
 */
export const fetchShoppingLists = async () => {
  try {
    const response = await apiClient.get('/users/me/households');
    return response.data;
  } catch (error) {
    handleGroshApiError(error);
  }
};

/**
 * Fetch items from a specific shopping list
 * @param {string} householdId - The ID of the household (shopping list)
 */
export const fetchShoppingListItems = async (householdId) => {
  try {
    const response = await apiClient.get(`/households/${householdId}/current`);
    return response.data;
  } catch (error) {
    handleGroshApiError(error);
  }
};
