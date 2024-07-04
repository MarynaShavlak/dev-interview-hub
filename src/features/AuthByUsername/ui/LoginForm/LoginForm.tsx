import { memo } from 'react';
import { RedesignedLoginForm } from './RedesignedLoginForm/RedesignedLoginForm';
import { DeprecatedLoginForm } from './DeprecatedLoginForm/DeprecatedLoginForm';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginReducer } from '../../model/slice/loginSlice';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedLoginForm onSuccess={onSuccess} />}
                off={<DeprecatedLoginForm onSuccess={onSuccess} />}
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
