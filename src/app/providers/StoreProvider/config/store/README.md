## Type Inference: 
The `AppDispatch` type is derived from the `createReduxStore` function, which configures the Redux store and its reducers.
The `AppDispatch` type is extracted from the store's return type, ensuring that all actions and middleware used are accurately typed.
```typescript
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
```


