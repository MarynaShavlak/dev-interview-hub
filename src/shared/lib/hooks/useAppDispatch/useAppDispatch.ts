import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProvider';
/**
 * Custom hook for accessing a strongly-typed Redux dispatch function.
 * @returns {AppDispatch} The typed dispatch function for dispatching actions to the Redux store.
 *
 * This hook provides a type-safe way to dispatch actions within a React application that uses Redux for state management.
 * By leveraging the `AppDispatch` type derived from the store configuration, it ensures that all dispatched actions are
 * correctly typed and consistent with the application's store setup.
 *
 *  This hook simplifies integrating Redux with TypeScript by automatically inferring action types from the store,
 *   reducing the need for manual type definitions and enhancing code maintainability.
 * */
export const useAppDispatch = () => useDispatch<AppDispatch>();
