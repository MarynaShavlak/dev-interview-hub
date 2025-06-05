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
    const { text } = link;

    const [linkText, setLinkText] = useState(text);
    const validConfig = useInputValidationConfig();
    const titleErrors = useInputErrors(linkText, validConfig.title);
    const hasInputErrors = Object.values(titleErrors).some((error) => error);

    const handleLinkTextChange = useCallback((value: string) => {
        setLinkText(value);
    }, []);

    const submitLinkTextChange = useCallback(() => {
        onSave({
            ...link,
            text: linkText,
        });
    }, [onSave, link, linkText]);

    return {
        linkText,
        handleLinkTextChange,
        submitLinkTextChange,
        hasInputErrors,
        validConfig,
    };
};
