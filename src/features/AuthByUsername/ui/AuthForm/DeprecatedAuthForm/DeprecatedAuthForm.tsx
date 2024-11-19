import { memo } from 'react';
import { AuthFormProps } from '../AuthForm';

// export const DeprecatedAuthForm = memo(
//     ({ className, onSuccess }: AuthFormProps) => {
//         const { t } = useTranslation();
//         const {
//             username,
//             password,
//             isLoading,
//             error,
//             onChangeUsername,
//             onChangePassword,
//             // onLoginClick,
//         } = useSignInForm(onSuccess);
//
//         return (
//             <VStack
//                 gap="16"
//                 className={classNames(cls.LoginForm, {}, [className])}
//             >
//                 <Text title={t('Форма авторизації')} />
//                 {error && (
//                     <Text
//                         text={t('Ви ввели невірний логін або пароль')}
//                         theme={TextTheme.ERROR}
//                     />
//                 )}
//                 <Input
//                     autofocus
//                     type="text"
//                     placeholder={t("Введіть ім'я користувача")}
//                     onChange={onChangeUsername}
//                     value={username}
//                 />
//                 <Input
//                     type="text"
//                     placeholder={t('Введіть пароль')}
//                     onChange={onChangePassword}
//                     value={password}
//                 />
//                 <Button
//                     theme={ButtonTheme.OUTLINE}
//                     className={cls.authBtn}
//                     // onClick={onLoginClick}
//                     disabled={isLoading}
//                 >
//                     {t('Вхід')}
//                 </Button>
//             </VStack>
//         );
//     },
// );

export const DeprecatedAuthForm = memo(
    ({ className, onSuccess }: AuthFormProps) => {
        return <div>111</div>;
    },
);
