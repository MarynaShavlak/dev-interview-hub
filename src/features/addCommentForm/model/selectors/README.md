# Documentation for Comment Form Selectors

## Overview
These selectors are designed to access and retrieve the text and error state of the add comment form from the Redux store. They facilitate the management of the add comment form's state within the application, ensuring efficient state retrieval for form handling.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useAddCommentFormText` and `getAddCommentFormText`
```typescript
export const [useAddCommentFormText, getAddCommentFormText] = buildSelector(
    (state: StateSchema) => state.addCommentForm?.text ?? '',
);
```
- **Purpose**: These selectors retrieve the current text value of the `addCommentForm` from the Redux store state.
- **Parameters**:
  - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**: 
  - `getAddCommentFormText`: A selector function that returns the text value from the `addCommentForm` object in the Redux store.
  - `useAddCommentFormText`: A custom hook that uses the `getAddCommentFormText` selector to retrieve the text value directly within React components.
- **Usage**:
  - `getAddCommentFormText`: Use this selector when you need to access the add comment form's text value in non-component code or for server-side operations.
  - `useAddCommentFormText`: Use this custom hook within React components to access the add comment form's text value directly from the Redux store. This hook simplifies form state management within components.


### `useAddCommentFormError` and `getAddCommentFormError`
```typescript
export const [useAddCommentFormError, getAddCommentFormError] = buildSelector(
    (state: StateSchema) => state.addCommentForm?.error,
);
```
- **Purpose**: These selectors retrieve the error state of the `addCommentForm` from the Redux store state.
- **Parameters**:
  - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**:
  - `getAddCommentFormError`: A selector function that returns the error state from the  `addCommentForm` object in the Redux store.
  - `useAddCommentFormError`: A custom hook that uses the `getAddCommentFormError` selector to retrieve the error state directly within React components.
- **Usage**:
  - `getAddCommentFormError`: Use this selector when you need to access the add comment form's error state in non-component code or for server-side operations.
  - `useAddCommentFormError`: Use this custom hook within React components to access the add comment form's error state directly from the Redux store. This hook simplifies form state management within components.


## Usage Examples 
## Example 1: `useAddCommentFormText` in Component
```typescript jsx
import { useAddCommentFormText } from '@/features/addCommentForm';

export function AddCommentForm() {
  const commentText = useAddCommentFormText();

  return (
          <textarea value={commentText} onChange={(e) => {/* handle change */}}>
      {commentText}
    </textarea>
  );
}

```

## Example 2: `useAddCommentFormError` in Component
```typescript jsx
import { useAddCommentFormError } from '@/features/addCommentForm';

export function AddCommentForm() {
  const error = useAddCommentFormError();

  return (
          <div>
            {error && <span className="error">{error}</span>}
            <textarea onChange={(e) => {/* handle change */}}></textarea>
          </div>
  );
}
```

## Conclusion 
- `getAddCommentFormText` and `useAddCommentFormText`: These utilities help in retrieving the text value of the add comment form from the Redux state, making form text management efficient and streamlined.
- `getAddCommentFormError` and `useAddCommentFormError`: These utilities assist in managing the error state of the add comment form, allowing for better error handling and user feedback within the form.

- By utilizing these selectors, you can effectively manage the state of the add comment form, ensuring a seamless user experience.
