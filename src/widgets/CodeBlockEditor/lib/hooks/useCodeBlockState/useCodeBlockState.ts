import { useState } from 'react';
import { useTextInput } from '@/shared/lib/hooks/useTextInput/useTextInput';

interface UseCodeBlockStateProps {
    initialTitle: string;
    initialCode: string;
}

export const useCodeBlockState = ({
    initialTitle,
    initialCode,
}: UseCodeBlockStateProps) => {
    const { value: title, handleChange: handleTitleChange } =
        useTextInput(initialTitle);

    const [code, setCode] = useState<string>(initialCode || '');
    const isEmptyContent = code.trim().length === 0;

    return {
        title,
        handleTitleChange,
        isEmptyContent,
        code,
        handleCodeChange: setCode,
    };
};
