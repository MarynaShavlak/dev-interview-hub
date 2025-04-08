import { useCallback } from 'react';
import { useAddQuestionFormActions } from '../../../model/slices/addQuestionFormSlice';
import {
    useAddQuestionFormError,
    useAddQuestionFormText,
} from '../../../model/selectors/addQuestionFormSelectors';

export const useAddQuestionForm = (onAddQuestion: (text: string) => void) => {
    const text = useAddQuestionFormText();
    const error = useAddQuestionFormError();
    const { setText } = useAddQuestionFormActions();

    const onQuestionTextChange = useCallback(
        (value: string) => {
            setText(value);
        },
        [setText],
    );

    const onSendHandler = useCallback(() => {
        onAddQuestion(text || '');
        onQuestionTextChange('');
    }, [onQuestionTextChange, onAddQuestion, text]);

    return {
        text,
        error,
        onQuestionTextChange,
        onSendHandler,
    };
};
