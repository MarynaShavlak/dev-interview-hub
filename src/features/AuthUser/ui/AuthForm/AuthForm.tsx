import { memo } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginReducer } from '../../model/slices/loginSlice/loginSlice';
import { signupReducer } from '../../testing';
import { useToggleForm } from '../../lib/hooks/useToggleForm/useToggleForm';
import { VStack } from '@/shared/ui/common/Stack';
import cls from './AuthForm.module.scss';
import { SigninForm } from './SigninForm/SigninForm';
import { SignupForm } from './SignupForm/SignupForm';
import { AuthActions } from './AuthActions/AuthActions';

export interface AuthFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
    signupForm: signupReducer,
};

const AuthForm = memo((props: AuthFormProps) => {
    const { isLoginFormOpen, toggleForm } = useToggleForm();
    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack gap="16" className={cls.AuthForm}>
                {isLoginFormOpen ? (
                    <SigninForm {...props} />
                ) : (
                    <SignupForm {...props} />
                )}
                <AuthActions
                    isLoginFormOpen={isLoginFormOpen}
                    onSuccess={props.onSuccess}
                    onToggleForm={toggleForm}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AuthForm;
