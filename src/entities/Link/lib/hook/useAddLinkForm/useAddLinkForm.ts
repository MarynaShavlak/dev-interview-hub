import { useCallback, useState } from 'react';
import {
    useAddLinkFormError,
    useAddLinkFormText,
} from '../../../model/selectors/addLinkFormSelectors';
import { useAddLinkFormActions } from '../../../model/slices/addLinkFormSlice';

export const useAddLinkForm = (onAddLink: (text: string) => void) => {
    const text = useAddLinkFormText();
    const error = useAddLinkFormError();
    const { setText } = useAddLinkFormActions();
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
        onAddLink(text);
        onQuestionTextChange('');
        setWasSubmitted(false);
    }, [onQuestionTextChange, onAddLink, text]);

    return {
        text,
        error,
        onQuestionTextChange,
        onSendHandler,
        wasSubmitted,
    };
};
