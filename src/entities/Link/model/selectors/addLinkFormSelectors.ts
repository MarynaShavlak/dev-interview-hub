import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useAddLinkFormText, getAddLinkFormText] = buildSelector(
    (state: StateSchema) => state.addLinkForm?.text ?? '',
);
export const [useAddLinkFormError, getAddLinkFormError] = buildSelector(
    (state: StateSchema) => state.addLinkForm?.error,
);
