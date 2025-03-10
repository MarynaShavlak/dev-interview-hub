import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { AuthFormProps } from '../AuthForm';
import { SignupFormRedesigned } from './SignupFormRedesigned/SignupFormRedesigned';
import { SignupFormDeprecated } from './SignupFormDeprecated/SignupFormDeprecated';

export const SignupForm = memo((props: AuthFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<SignupFormRedesigned {...props} />}
            off={<SignupFormDeprecated {...props} />}
        />
    );
});
