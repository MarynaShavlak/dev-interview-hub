import { useTranslation } from 'react-i18next';
import { memo, useContext, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useLoginForm } from '../../../lib/hooks/useLoginForm/useLoginForm';
import { AuthFormProps } from '../AuthForm';
import { Context } from '../../../../../../json-server/firebase';
import { SignInForm } from './SigninForm/SigninForm';

export const RedesignedAuthForm = memo((props: AuthFormProps) => {
    const { className, onSuccess } = props;
    const { t } = useTranslation('profile');
    const {
        username,
        password,
        isLoading,
        error,
        onChangeUsername,
        onChangePassword,
        onLoginClick,
        onSignupClick,
    } = useLoginForm(onSuccess);

    const [isLoginFormOpen, setIsLoginFormOpen] = useState(true);

    const buttonText = isLoginFormOpen ? t('Увійти') : t('Зареєструватись');
    const buttonGoogleText = t('Продовжити через Goggle');
    const redirectText = isLoginFormOpen
        ? t('Немає облікового запису?')
        : t('Вже маєш акаунт?');

    const redirectLinkText = isLoginFormOpen
        ? t('Зареєструйтесь')
        : t('Увійти');

    const { auth } = useContext(Context);
    console.log('current', auth.currentUser?.email);

    // const memoizedUsernameValidations = useMemo(
    //     () => ({
    //         isEmpty: true,
    //         isEmail: true,
    //     }),
    //     [],
    // );
    //
    // const memoizedPasswordValidations = useMemo(
    //     () => ({
    //         isEmpty: true,
    //         minLength: 3,
    //         maxLength: 8,
    //     }),
    //     [],
    // );
    //
    // const usernameValidation = useValidation(
    //     username,
    //     memoizedUsernameValidations,
    // );
    // const passwordValidation = useValidation(
    //     password,
    //     memoizedPasswordValidations,
    // );
    //
    // const hasErrors =
    //     Object.values(usernameValidation).some((error) => error) ||
    //     Object.values(passwordValidation).some((error) => error);

    const handleRedirectLinkClick = () => {
        setIsLoginFormOpen((prevState) => !prevState);
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            console.log('user with google', user);
        } catch (err) {
            console.error('Error during Google sign-in:', err);
        }
    };

    // const SignUpForm = () => {
    //     return (
    //         <VStack
    //             gap="16"
    //             className={classNames(cls.LoginForm, {}, [className])}
    //             data-testid="auth-form-sign-up"
    //         >
    //             <Text title={formTitle} />
    //             {/* {error && ( */}
    //             {/*    <Text */}
    //             {/*        text={t('Ви ввели невірний логін або пароль')} */}
    //             {/*        variant="error" */}
    //             {/*    /> */}
    //             {/* )} */}
    //             <Input
    //                 autofocus
    //                 type="text"
    //                 placeholder={t("Введіть ваше ім'я")}
    //                 onChange={onChangeUsername}
    //                 value={username}
    //                 data-testid="signup-firstname-input"
    //                 label={t("Ім'я")}
    //                 validations={memoizedUsernameValidations}
    //                 errors={usernameValidation}
    //             />
    //             <Input
    //                 type="text"
    //                 placeholder={t('Введіть Ваше прізвище')}
    //                 onChange={onChangeUsername}
    //                 value={username}
    //                 data-testid="signup-lastname-input"
    //                 label={t('Прізвище')}
    //                 validations={memoizedUsernameValidations}
    //                 errors={usernameValidation}
    //             />
    //             <Input
    //                 type="text"
    //                 placeholder={t("Введіть ім'я користувача")}
    //                 onChange={onChangeUsername}
    //                 value={username}
    //                 data-testid="signup-username-input"
    //                 label={t("Ім'я користувача")}
    //                 validations={memoizedUsernameValidations}
    //                 errors={usernameValidation}
    //             />
    //             <Input
    //                 type="text"
    //                 placeholder={t('Введіть email')}
    //                 onChange={onChangeUsername}
    //                 value={username}
    //                 data-testid="signup-email-input"
    //                 label={t('Email')}
    //                 validations={memoizedUsernameValidations}
    //                 errors={usernameValidation}
    //             />
    //
    //             <Input
    //                 type="text"
    //                 placeholder={t('Введіть пароль')}
    //                 onChange={onChangePassword}
    //                 value={password}
    //                 data-testid="signup--password-input"
    //                 label={t('Пароль')}
    //                 addonRight={
    //                     <Icon
    //                         Svg={EyeIconRedesigned}
    //                         clickable
    //                         onClick={(e: any) => console.log(e.target)}
    //                     />
    //                 }
    //             />
    //
    //             <Button
    //                 max
    //                 variant="accent"
    //                 className={cls.loginBtn}
    //                 onClick={onSignupClick}
    //                 disabled={isLoading || hasErrors}
    //                 data-testid="login-submit-btn"
    //             >
    //                 {buttonText}
    //             </Button>
    //             <HStack
    //                 className={cls.formDivider}
    //                 align="center"
    //                 justify="center"
    //                 max
    //             >
    //                 <Text text={t('або')} />
    //             </HStack>
    //
    //             <Button
    //                 max
    //                 variant="outline"
    //                 addonLeft={<Icon Svg={GoogleIcon} width="25" height="25" />}
    //                 className={cls.loginBtn}
    //                 // onClick={onLoginClick}
    //                 onClick={loginWithGoogle}
    //                 disabled={isLoading}
    //                 data-testid="login-submit-btn"
    //             >
    //                 {buttonGoogleText}
    //             </Button>
    //
    //             <HStack
    //                 justify="center"
    //                 className={cls.formRedirectWrapper}
    //                 gap="8"
    //             >
    //                 <Text text={redirectText} />
    //                 <Button variant="link" onClick={handleRedirectLinkClick}>
    //                     {redirectLinkText}
    //                 </Button>
    //             </HStack>
    //         </VStack>
    //     );
    // };
    return isLoginFormOpen ? (
        <SignInForm {...props} />
    ) : (
        <SignUpForm {...props} />
    );
});
