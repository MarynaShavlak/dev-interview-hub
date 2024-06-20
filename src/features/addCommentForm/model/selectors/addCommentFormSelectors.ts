import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useAddCommentFormText, getAddCommentFormText] = buildSelector((state: StateSchema) => state.addCommentForm?.text ?? '');
export const [useAddCommentFormError, getAddCommentFormError] = buildSelector((state: StateSchema) => state.addCommentForm?.error);
