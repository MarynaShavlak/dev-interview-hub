import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { UserCardProps } from '../UserCard';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { AvatarUploader } from '../AvatarUploader/AvatarUploader';

export const UserCardRedesigned = memo((props: UserCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
        onFileUpload,
    } = props;
    const { t } = useTranslation('profile');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '32' });

    const validConfig = useInputValidationConfig();
    const { username = '', firstname = '', lastname = '' } = data || {};

    const { lastnameErrors, usernameErrors, firstnameErrors } =
        useFormValidation(
            { username, firstname, lastname },
            validConfig,
            'profile',
        );

    const leftInputs = (
        <>
            <Input
                value={data?.email}
                label={`${t('Email')}:`}
                readonly
                disabled
                data-testid="UserCard.email"
            />
            <Input
                value={data?.firstname}
                label={`${t("Ім'я")}:`}
                onChange={onChangeFirstname}
                readonly={readonly}
                disabled={readonly}
                data-testid="UserCard.firstname"
                validations={validConfig.firstname}
                errors={firstnameErrors}
            />
            <Input
                value={data?.lastname}
                label={`${t('Прізвище')}:`}
                onChange={onChangeLastname}
                readonly={readonly}
                disabled={readonly}
                data-testid="UserCard.lastname"
                validations={validConfig.lastname}
                errors={lastnameErrors}
            />

            <Input
                value={data?.age || ''}
                label={`${t('Вік')}:`}
                onChange={onChangeAge}
                readonly={readonly}
                disabled={readonly}
                digitsOnly
                data-testid="UserCard.age"
            />
        </>
    );
    const rightInputs = (
        <>
            <Input
                value={data?.username}
                label={`${t("Ім'я користувача")}:`}
                onChange={onChangeUsername}
                readonly={readonly}
                disabled={readonly}
                data-testid="UserCard.username"
                validations={validConfig.lastname}
                errors={usernameErrors}
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
            <Input
                value={data?.city || ''}
                label={`${t('Місто')}:`}
                onChange={onChangeCity}
                readonly={readonly}
                disabled={readonly}
                data-testid="UserCard.city"
            />
        </>
    );

    return (
        <Card
            padding="24"
            max
            className={classNames(className ?? '', {}, additionalClasses)}
        >
            <AvatarUploader
                avatar={data?.avatar || ''}
                readonly={readonly}
                onFileUpload={onFileUpload}
            />

            {!isMobile && (
                <HStack gap="24" max align="start">
                    <VStack gap="16" max>
                        {leftInputs}
                    </VStack>
                    <VStack gap="16" max>
                        {rightInputs}
                    </VStack>
                </HStack>
            )}
            {isMobile && (
                <VStack gap="16" max>
                    {leftInputs}
                    {rightInputs}
                </VStack>
            )}
        </Card>
    );
});
