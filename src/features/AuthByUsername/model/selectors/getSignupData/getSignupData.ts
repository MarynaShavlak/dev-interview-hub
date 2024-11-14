import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useSignupEmail, getSignupEmail] = buildSelector(
    (state: StateSchema) => state?.signupForm?.email || '',
);

export const [useSignupUsername, getSignupUsername] = buildSelector(
    (state: StateSchema) => state?.signupForm?.username || '',
);

export const [useSignupFirstname, getSignupFirstname] = buildSelector(
    (state: StateSchema) => state?.signupForm?.firstname || '',
);

export const [useSignupLastname, getSignupLastname] = buildSelector(
    (state: StateSchema) => state?.signupForm?.lastname || '',
);

export const [useSignupPassword, getSignupPassword] = buildSelector(
    (state: StateSchema) => state?.signupForm?.password || '',
);

export const [useSignupError, getSignupError] = buildSelector(
    (state: StateSchema) => state?.signupForm?.error,
);

export const [useSignupIsLoading, getSignupIsLoading] = buildSelector(
    (state: StateSchema) => state?.signupForm?.isLoading || false,
);
