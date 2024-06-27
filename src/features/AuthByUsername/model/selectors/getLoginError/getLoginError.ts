import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useLoginError, getLoginError] = buildSelector(
    (state: StateSchema) => state?.loginForm?.error,
);
