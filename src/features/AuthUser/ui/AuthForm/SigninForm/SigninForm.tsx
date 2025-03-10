import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { SigninFormRedesigned } from './SigninFormRedesigned/SigninFormRedesigned';
import { SigninFormDeprecated } from './SigninFormDeprecated/SigninFormDeprecated';
import { AuthFormProps } from '../AuthForm';

export const SigninForm = memo((props: AuthFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<SigninFormRedesigned {...props} />}
            off={<SigninFormDeprecated {...props} />}
        />
    );
});
