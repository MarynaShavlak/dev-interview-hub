import { useCallback, useState } from 'react';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

export const useBlockTitle = (initialTitle: string = '') => {
    const [title, setTitle] = useState(initialTitle);
    const validConfig = useInputValidationConfig();

    const handleTitleChange = useCallback((value: string) => {
        setTitle(value);
    }, []);

    return { title, handleTitleChange, validConfig };
};
