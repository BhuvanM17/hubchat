import * as SecureStore from 'expo-secure-store';

export const storage = {
  set: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.log('Error saving to SecureStore:', e);
    }
  },
  get: async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.log('Error reading from SecureStore:', e);
      return null;
    }
  },
  delete: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.log('Error deleting from SecureStore:', e);
    }
  },
};
