# AddCommentForm

## Overview
The **`AddCommentForm`** component is designed to provide a flexible comment submission interface that adapts based on the application's design configuration. Utilizing the `isAppRedesigned` feature flag, it dynamically renders either the `AddCommentFormRedesigned` or the `AddCommentFormDeprecated`, ensuring that the user interface aligns with the current design standards. The component leverages dynamic reducer management to optimize state handling and modularity. By employing `DynamicModuleLoader`, the `addCommentFormReducer` is only loaded when necessary, which is particularly advantageous in managing application performance and ensuring that the state is efficiently handled during the user's comment interaction.

## Type Definition
```typescript
interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}
```

## Props
The **`AddCommentForm`** component accepts the following props:

| Prop       | Type                               | Required / Optional | Description                                                              |
|------------|------------------------------------|----------------------|--------------------------------------------------------------------------|
| `className` | `string`                           | Optional             | Custom class name for additional styling..             |
| `onSendComment` | `(text: string) => void`                 | Required             | Callback function triggered when a comment is submitted. |

### Features

1. **Feature Flag Driven**: The component adapts its UI between `AddCommentFormRedesigned` and `AddCommentFormDeprecated` based on the `isAppRedesigned` feature flag. This ensures the comment form interface is consistent with the current application design.

2. **Dynamic Reducer Management**: Utilizes `DynamicModuleLoader` to dynamically manage the `addCommentFormReducer`. This approach helps in optimizing the state management by only loading the reducer when the comment form is required, thus reducing the overall application bundle size and improving performance.

3. **Performance Optimization**: Implements lazy loading through `AddCommentFormAsync`, which defers the loading of the `AddCommentForm` component until it is required. This reduces the initial load time of the application, further optimizing performance and improving user experience.

## Usage Example 
```typescript jsx
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from '@/features/addCommentForm';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { addCommentForArticleThunk } from '../model/services/addCommentForArticleThunk/addCommentForArticleThunk';

const ArticleComments = memo(() => {
    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticleThunk(text));
        },
        [dispatch],
    );

     return (
        <VStack gap="16" max >
            <AddCommentForm onSendComment={onSendComment} />
            {/* Render articles list here, for example */}
        </VStack>
    );
});

export default ArticleComments;
```


### Conclusion

The **`AddCommentForm`** component plays a crucial role in providing an interface for users to submit new comments. By adapting its design based on the application's feature flags and efficiently managing state through dynamic reducers, it ensures that the user experience remains consistent and performance remains optimal. This component not only integrates seamlessly with the current design standards but also contributes to improved application performance by managing state and loading efficiently.
