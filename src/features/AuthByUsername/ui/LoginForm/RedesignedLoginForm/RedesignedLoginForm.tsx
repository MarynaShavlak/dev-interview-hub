import { useTranslation } from 'react-i18next';
import { memo, useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { useLoginForm } from '../../../lib/hooks/useLoginForm';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../LoginForm.module.scss';
import { LoginFormProps } from '../LoginForm';
import { Context } from '../../../../../../json-server/firebase';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIconRedesigned from '@/shared/assets/icons/eye.svg';

export const RedesignedLoginForm = memo(
    ({ className, onSuccess }: LoginFormProps) => {
        const { t } = useTranslation();
        const {
            username,
            password,
            isLoading,
            error,
            onChangeUsername,
            onChangePassword,
            onLoginClick,
        } = useLoginForm(onSuccess);

        const { auth } = useContext(Context);
        console.log('auth', auth);

        const login = async () => {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            console.log(user);
        };

        return (
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
                data-testid="login-form"
            >
                <Text title={t('Форма авторизації')} />
                {error && (
                    <Text
                        text={t('Ви ввели невірний логін або пароль')}
                        variant="error"
                    />
                )}
                <Input
                    autofocus
                    type="text"
                    placeholder={t('Введіть email')}
                    onChange={onChangeUsername}
                    value={username}
                    data-testid="login-username-input"
                    label={t('Email')}
                />
                <Input
                    type="text"
                    placeholder={t('Введіть пароль')}
                    onChange={onChangePassword}
                    value={password}
                    data-testid="login-password-input"
                    label={t('Пароль')}
                    addonRight={
                        <Icon
                            Svg={EyeIconRedesigned}
                            clickable
                            onClick={(e: any) => console.log(e.target)}
                        />
                    }
                />
                <Button
                    max
                    variant="accent"
                    className={cls.loginBtn}
                    // onClick={onLoginClick}
                    onClick={login}
                    disabled={isLoading}
                    data-testid="login-submit-btn"
                >
                    {t('Увійти')}
                </Button>
                <HStack justify="center">
                    <Text text={t('Немає облікового запису?')} />
                    <Text text={t('Зареєструйтесь.')} />
                </HStack>
            </VStack>
        );
    },
);
