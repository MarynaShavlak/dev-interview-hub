import { useCallback, useState } from 'react';
import {
    useAddVocabularyFormError,
    useAddVocabularyFormMeaning,
    useAddVocabularyFormText,
    useAddVocabularyFormTranslation,
} from '../../../model/selectors/addVocabularyFormSelectors';
import { useAddVocabularyFormActions } from '../../../model/slices/addVocabularyFormSlice';

export const useAddVocabularyForm = (
    onAddVocabulary: (
        text: string,
        meaning: string,
        translation: string,
    ) => void,
) => {
    const text = useAddVocabularyFormText();
    const meaning = useAddVocabularyFormMeaning();
    const translation = useAddVocabularyFormTranslation();
    const error = useAddVocabularyFormError();
    const { setText, setMeaning, setTranslation } =
        useAddVocabularyFormActions();
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const onTextChange = useCallback(
        (value: string) => {
            setText(value);
            setWasSubmitted(false);
        },
        [setText],
    );

    const onMeaningChange = useCallback(
        (value: string) => {
            setMeaning(value);
            setWasSubmitted(false);
        },
        [setMeaning],
    );

    const onTranslationChange = useCallback(
        (value: string) => {
            setTranslation(value);
            setWasSubmitted(false);
        },
        [setTranslation],
    );

    const onSendHandler = useCallback(() => {
        if (!text.trim() || !meaning.trim() || !translation.trim()) {
            setWasSubmitted(true);
            return;
        }

        onAddVocabulary(text, meaning, translation);

        onTextChange('');
        onMeaningChange('');
        onTranslationChange('');
        setWasSubmitted(true);
    }, [
        text,
        meaning,
        translation,
        onAddVocabulary,
        onTextChange,
        onMeaningChange,
        onTranslationChange,
    ]);

    return {
        text,
        meaning,
        translation,
        error,
        onTextChange,
        onMeaningChange,
        onTranslationChange,
        onSendHandler,
        wasSubmitted,
    };
};
