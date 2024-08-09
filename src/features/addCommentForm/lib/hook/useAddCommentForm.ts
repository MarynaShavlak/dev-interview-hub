import { useCallback } from 'react';
import {
    useAddCommentFormText,
    useAddCommentFormError,
} from '../../model/selectors/addCommentFormSelectors';
import { useAddCommentFormActions } from '../../model/slices/addCommentFormSlice';

export interface useAddCommentFormProps {
    onSendComment: (text: string) => void;
}

/**
 * Custom hook for managing the add comment form state and actions.
 * @param {Function} onSendComment - A callback function to handle the submission of a comment.
 *
 * @returns {{
 *    text: string;
 *    error: object | null;
 *    onCommentTextChange: (value: string) => void;
 *    onSendHandler: () => void;
 *  }} An object with the following properties:
 *  * `text`: The current text input value in the comment form.
 *  * `error`: An error object if an error occurred while interacting with the form, or `null` otherwise.
 *  * `onCommentTextChange`: Function to handle changes to the comment text input.
 *  * `onSendHandler`: Function to handle the submission of the comment.
 *
 *
 * */

export const useAddCommentForm = (onSendComment: (text: string) => void) => {
    const text = useAddCommentFormText();
    const error = useAddCommentFormError();
    const { setText } = useAddCommentFormActions();

    const onCommentTextChange = useCallback(
        (value: string) => {
            setText(value);
        },
        [setText],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return {
        text,
        error,
        onCommentTextChange,
        onSendHandler,
    };
};
