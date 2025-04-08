import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useAddQuestionFormText, getAddQuestionFormText] = buildSelector(
    (state: StateSchema) => state.addQuestionForm?.text ?? '',
);
export const [useAddQuestionFormError, getAddQuestionFormError] = buildSelector(
    (state: StateSchema) => state.addQuestionForm?.error,
);
