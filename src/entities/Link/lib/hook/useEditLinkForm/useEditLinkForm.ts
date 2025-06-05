import { useState, useCallback } from 'react';

import { Link } from '../../../model/types/link';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

interface UseEditLinkFormProps {
    link: Link;
    onSave: (link: Link) => void;
}

export const useEditLinkForm = (props: UseEditLinkFormProps) => {
    const { link, onSave } = props;
    const { text, label } = link;

    const [linkText, setLinkText] = useState(text);
    const [linkLabel, setLinkLabel] = useState(label);
    const validConfig = useInputValidationConfig();
    const linkErrors = useInputErrors(linkText, validConfig.subtitleLink);
    const labelErrors = useInputErrors(linkLabel, validConfig.title);
    const hasInputErrors =
        Object.values(labelErrors).some((error) => error) ||
        Object.values(linkErrors).some((error) => error);

    const handleLinkTextChange = useCallback((value: string) => {
        setLinkText(value);
    }, []);

    const handleLinkLabelChange = useCallback((value: string) => {
        setLinkLabel(value);
    }, []);

    const submitLinkTextChange = useCallback(() => {
        onSave({
            ...link,
            text: linkText,
            label: linkLabel,
        });
    }, [onSave, link, linkText, linkLabel]);

    return {
        linkText,
        linkLabel,
        handleLinkTextChange,
        handleLinkLabelChange,
        submitLinkTextChange,
        hasInputErrors,
        validConfig,
        linkErrors,
        labelErrors,
    };
};
