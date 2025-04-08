import { useCallback, useState } from 'react';
import { useAddQuestionFormActions } from '../../../model/slices/addQuestionFormSlice';
import {
    useAddQuestionFormError,
    useAddQuestionFormText,
} from '../../../model/selectors/addQuestionFormSelectors';

export const useAddQuestionForm = (onAddQuestion: (text: string) => void) => {
    const text = useAddQuestionFormText();
    const error = useAddQuestionFormError();
    const { setText } = useAddQuestionFormActions();
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const onQuestionTextChange = useCallback(
        (value: string) => {
            setText(value);
            setWasSubmitted(false);
        },
        [setText],
    );

    const onSendHandler = useCallback(() => {
        if (!text.trim()) {
            setWasSubmitted(true);
            return;
        }
        onAddQuestion(text);
        onQuestionTextChange('');
        setWasSubmitted(false);
    }, [onQuestionTextChange, onAddQuestion, text]);

    return {
        text,
        error,
        onQuestionTextChange,
        onSendHandler,
        wasSubmitted,
    };
};
