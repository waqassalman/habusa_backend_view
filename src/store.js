import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/userSlice';
import toastReducer from './components/toastSlice';
// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
    // Define the root reducer object
    reducer: {
        // 'user' is the name of the slice in the store, and it's managed by userReducer
        toast: toastReducer,
        user: userReducer,
    },
});
export default store; // Export the store for use in the app (e.g., in <Provider store={store}>)