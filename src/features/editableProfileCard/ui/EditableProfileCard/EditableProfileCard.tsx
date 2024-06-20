import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Text, TextTheme } from '@/shared/ui/Text';
import { ProfileCard } from '@/entities/Profile';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { ValidateProfileError } from '../../model/consts/consts';
import { useProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import {
    useProfileIsLoading,
} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { useProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { useProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import {
    useProfileValidateErrors,
} from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileReducer, useProfileActions } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');
    const { updateProfile } = useProfileActions();

    const dispatch = useAppDispatch();
    const formData = useProfileForm();
    const isLoading = useProfileIsLoading();
    const error = useProfileError();
    const readonly = useProfileReadonly();
    const validateErrors = useProfileValidateErrors();

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Помилка сервера при збереженні даннних'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некоректний регіон'),
        [ValidateProfileError.NO_DATA]: t('Дані не вказано'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t("Прізвище та ім'я є обов'язковими полями"),
        [ValidateProfileError.INCORRECT_AGE]: t('Некоректний формат віку'),
    };

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const onChangeFirstname = useCallback((value?: string) => {
        updateProfile({ first: value || '' });
    }, [updateProfile]);

    const onChangeLastname = useCallback((value?: string) => {
        updateProfile({ lastname: value || '' });
    }, [updateProfile]);

    const onChangeCity = useCallback((value?: string) => {
        updateProfile({ city: value || '' });
    }, [updateProfile]);

    const onChangeAge = useCallback((value?: string) => {
        updateProfile({ age: Number(value || 0) });
    }, [updateProfile]);

    const onChangeUsername = useCallback((value?: string) => {
        updateProfile({ username: value || '' });
    }, [updateProfile]);

    const onChangeAvatar = useCallback((value?: string) => {
        updateProfile({ avatar: value || '' });
    }, [updateProfile]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        updateProfile({ currency });
    }, [updateProfile]);

    const onChangeCountry = useCallback((country: Country) => {
        updateProfile({ country });
    }, [updateProfile]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="8"
                max
                className={classNames('', {}, [className])}
            >
                <EditableProfileCardHeader />
                {validateErrors?.length && validateErrors.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]}
                        data-testid="EditableProfileCard.Error"
                    />
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
