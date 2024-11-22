import { useTranslation } from 'react-i18next';
import { UserCardProps } from '../UserCard/UserCard';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/common/Stack';

import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import cls from './DeprecatedUserCard.module.scss';

export const DeprecatedUserCard = (props: UserCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            gap="8"
            max
            className={classNames(cls.UserCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify="center" max>
                    <AvatarDeprecated
                        size={200}
                        src={data?.avatar}
                        alt={t('Аватар користувача')}
                    />
                </HStack>
            )}

            <InputDeprecated
                value={data?.username}
                placeholder={t("Ім'я користувача")}
                onChange={onChangeUsername}
                readonly={readonly}
                data-testid="UserCard.username"
            />
            <InputDeprecated
                value={data?.firstname}
                placeholder={t("Ваше ім'я")}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="UserCard.firstname"
            />
            <InputDeprecated
                value={data?.lastname}
                placeholder={t('Ваше прізвище')}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="UserCard.lastname"
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
            <InputDeprecated
                value={data?.avatar}
                placeholder={t('Введіть посилання на аватар')}
                className={cls.inputAvatar}
                onChange={onChangeAvatar}
                readonly={readonly}
                data-testid="UserCard.avatar"
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
