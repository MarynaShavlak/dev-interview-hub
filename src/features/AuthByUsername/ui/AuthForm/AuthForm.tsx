import { memo } from 'react';
import { RedesignedAuthForm } from './RedesignedAuthForm/RedesignedAuthForm';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginReducer } from '../../model/slices/loginSlice/loginSlice';
import { signupReducer } from '../../testing';

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
                on={<RedesignedAuthForm {...props} />}
                off={<RedesignedAuthForm {...props} />}
                // off={<DeprecatedAuthForm {...props} />}
            />
        </DynamicModuleLoader>
    );
});

export default AuthForm;
