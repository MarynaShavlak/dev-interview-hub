import { memo } from 'react';
import { AuthFormRedesigned } from './AuthFormRedesigned/AuthFormRedesigned';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginReducer } from '../../model/slices/loginSlice/loginSlice';
import { signupReducer } from '../../testing';
import { AuthFormDeprecated } from './AuthFormDeprecated/AuthFormDeprecated';

export interface AuthFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
    signupForm: signupReducer,
};

const AuthForm = memo((props: AuthFormProps) => {
    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<AuthFormRedesigned {...props} />}
                off={<AuthFormDeprecated {...props} />}
            />
        </DynamicModuleLoader>
    );
});

export default AuthForm;
