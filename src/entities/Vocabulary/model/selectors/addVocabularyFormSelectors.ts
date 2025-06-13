import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useAddVocabularyFormText, getAddVocabularyFormText] =
    buildSelector((state: StateSchema) => state.addVocabularyForm?.text ?? '');

export const [useAddVocabularyFormMeaning, getAddVocabularyFormMeaning] =
    buildSelector(
        (state: StateSchema) => state.addVocabularyForm?.meaning ?? '',
    );

export const [
    useAddVocabularyFormTranslation,
    getAddVocabularyFormTranslation,
] = buildSelector(
    (state: StateSchema) => state.addVocabularyForm?.translation ?? '',
);

export const [useAddVocabularyFormError, getAddVocabularyFormError] =
    buildSelector((state: StateSchema) => state.addVocabularyForm?.error);
