import { useState, useCallback } from 'react';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { Vocabulary } from '../../../model/types/vocabulary';

interface UseEditVocabularyFormProps {
    vocabulary: Vocabulary;
    onSave: (vocabulary: Vocabulary) => void;
}

export const useEditVocabularyForm = (props: UseEditVocabularyFormProps) => {
    const { vocabulary, onSave } = props;
    const { text, meaning, translation } = vocabulary;

    const [vocabText, setVocabText] = useState(text);
    const [vocabMeaning, setVocabMeaning] = useState(meaning);
    const [vocabTranslation, setVocabTranslation] = useState(translation);

    const validConfig = useInputValidationConfig();
    const textErrors = useInputErrors(vocabText, validConfig.title);
    const meaningErrors = useInputErrors(vocabMeaning, validConfig.title);
    const translationErrors = useInputErrors(
        vocabTranslation,
        validConfig.title,
    );

    const hasInputErrors =
        Object.values(textErrors).some(Boolean) ||
        Object.values(meaningErrors).some(Boolean) ||
        Object.values(translationErrors).some(Boolean);

    const handleTextChange = useCallback((value: string) => {
        setVocabText(value);
    }, []);

    const handleMeaningChange = useCallback((value: string) => {
        setVocabMeaning(value);
    }, []);

    const handleTranslationChange = useCallback((value: string) => {
        setVocabTranslation(value);
    }, []);

    const submitVocabularyChange = useCallback(() => {
        onSave({
            ...vocabulary,
            text: vocabText,
            meaning: vocabMeaning,
            translation: vocabTranslation,
        });
    }, [onSave, vocabulary, vocabText, vocabMeaning, vocabTranslation]);

    return {
        vocabText,
        vocabMeaning,
        vocabTranslation,
        handleTextChange,
        handleMeaningChange,
        handleTranslationChange,
        submitVocabularyChange,
        hasInputErrors,
        validConfig,
        textErrors,
        meaningErrors,
        translationErrors,
    };
};
