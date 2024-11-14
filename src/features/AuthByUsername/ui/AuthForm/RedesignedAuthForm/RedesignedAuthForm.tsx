import { useTranslation } from 'react-i18next';
import { memo, useContext, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { AuthFormProps } from '../AuthForm';
import { Context } from '../../../../../../json-server/firebase';
import { SignInForm } from './SigninForm/SigninForm';
import { SignUpForm } from './SignupForm/SignupForm';

export const RedesignedAuthForm = memo((props: AuthFormProps) => {
    const { t } = useTranslation('profile');

    const [isLoginFormOpen, setIsLoginFormOpen] = useState(true);

    const buttonGoogleText = t('Продовжити через Goggle');
    const redirectText = isLoginFormOpen
        ? t('Немає облікового запису?')
        : t('Вже маєш акаунт?');

    const redirectLinkText = isLoginFormOpen
        ? t('Зареєструйтесь')
        : t('Увійти');

    const { auth } = useContext(Context);
    console.log('current', auth.currentUser?.email);

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

    return isLoginFormOpen ? (
        <SignInForm {...props} />
    ) : (
        <SignUpForm {...props} />
    );

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
});
