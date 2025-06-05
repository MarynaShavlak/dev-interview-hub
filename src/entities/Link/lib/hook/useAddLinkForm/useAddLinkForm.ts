import { useCallback, useState } from 'react';
import {
    useAddLinkFormError,
    useAddLinkFormLabel,
    useAddLinkFormText,
} from '../../../model/selectors/addLinkFormSelectors';
import { useAddLinkFormActions } from '../../../model/slices/addLinkFormSlice';

export const useAddLinkForm = (
    onAddLink: (text: string, label: string) => void,
) => {
    const text = useAddLinkFormText();
    const label = useAddLinkFormLabel();
    const error = useAddLinkFormError();
    const { setText, setLabel } = useAddLinkFormActions();
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const onLinkTextChange = useCallback(
        (value: string) => {
            setText(value);
            setWasSubmitted(false);
        },
        [setText],
    );

    const onLinkLabelChange = useCallback(
        (value: string) => {
            setLabel(value);
            setWasSubmitted(false);
        },
        [setLabel],
    );

    const onSendHandler = useCallback(() => {
        if (!text.trim() && !label.trim()) {
            setWasSubmitted(true);
            return;
        }
        onAddLink(text, label);
        onLinkTextChange('');
        onLinkLabelChange('');
        setWasSubmitted(false);
    }, [text, label, onAddLink, onLinkTextChange, onLinkLabelChange]);

    return {
        text,
        label,
        error,
        onLinkTextChange,
        onSendHandler,
        wasSubmitted,
        onLinkLabelChange,
    };
};
