import { useCallback } from 'react';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { useLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { useLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { useLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { useLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { useLoginActions } from '../../model/slice/loginSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const useLoginForm = (onSuccess: () => void) => {
    const dispatch = useAppDispatch();
    const username = useLoginUsername();
    const password = useLoginPassword();
    const isLoading = useLoginIsLoading();
    const error = useLoginError();
    const forceUpdate = useForceUpdate();
    const { setPassword, setUsername } = useLoginActions();

    const onChangeUsername = useCallback(
        (value: string) => {
            setUsername(value);
        },
        [setUsername],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            setPassword(value);
        },
        [setPassword],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
            const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        }
    }, [dispatch, onSuccess, password, username, forceUpdate]);

    return {
        username,
        password,
        isLoading,
        error,
        onChangeUsername,
        onChangePassword,
        onLoginClick,
    };
};
