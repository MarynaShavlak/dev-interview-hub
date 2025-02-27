import { useTranslation } from 'react-i18next';
import { UserCardProps } from '../UserCard';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';

import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import cls from './UserCardDeprecated.module.scss';
import { AvatarUploader } from '../AvatarUploader/AvatarUploader';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';

export const UserCardDeprecated = (props: UserCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry,
        onFileUpload,
    } = props;
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    const validConfig = useInputValidationConfig();
    const { username = '', firstname = '', lastname = '' } = data || {};

    const { lastnameErrors, usernameErrors, firstnameErrors } =
        useFormValidation(
            { username, firstname, lastname },
            validConfig,
            'profile',
        );

    return (
        <VStack
            gap="8"
            max
            className={classNames(cls.UserCard, mods, [className])}
        >
            <AvatarUploader
                avatar={data?.avatar || ''}
                readonly={readonly}
                onFileUpload={onFileUpload}
            />

            <InputDeprecated
                value={data?.username}
                placeholder={t("Ім'я користувача")}
                onChange={onChangeUsername}
                readonly={readonly}
                data-testid="UserCard.username"
                validations={validConfig.lastname}
                errors={usernameErrors}
            />
            <InputDeprecated
                value={data?.firstname}
                placeholder={t("Ваше ім'я")}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="UserCard.firstname"
                validations={validConfig.firstname}
                errors={firstnameErrors}
            />
            <InputDeprecated
                value={data?.lastname}
                placeholder={t('Ваше прізвище')}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="UserCard.lastname"
                validations={validConfig.lastname}
                errors={lastnameErrors}
            />
            <InputDeprecated
                value={data?.age}
                placeholder={t('Ваш вік')}
                onChange={onChangeAge}
                readonly={readonly}
                digitsOnly
                data-testid="UserCard.age"
            />
            <InputDeprecated
                value={data?.city}
                placeholder={t('Ваше місто')}
                onChange={onChangeCity}
                readonly={readonly}
                data-testid="UserCard.city"
            />

            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
};
