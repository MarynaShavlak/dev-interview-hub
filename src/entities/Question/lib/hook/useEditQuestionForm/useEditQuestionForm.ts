import { useState, useCallback } from 'react';

import { Question } from '../../../model/types/question';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

interface UseEditQuestionFormProps {
    question: Question;
    onSave: (question: Question) => void;
}

export const useEditQuestionForm = (props: UseEditQuestionFormProps) => {
    const { question, onSave } = props;
    const { text } = question;

    const [questionText, setQuestionText] = useState(text);
    const validConfig = useInputValidationConfig();
    const titleErrors = useInputErrors(questionText, validConfig.title);
    const hasInputErrors = Object.values(titleErrors).some((error) => error);

    const handleQuestionTextChange = useCallback((value: string) => {
        setQuestionText(value);
    }, []);

    const submitQuestionTextChange = useCallback(() => {
        onSave({
            ...question,
            text: questionText,
        });
    }, [onSave, question, questionText]);

    return {
        questionText,
        handleQuestionTextChange,
        submitQuestionTextChange,
        hasInputErrors,
        validConfig,
    };
};
