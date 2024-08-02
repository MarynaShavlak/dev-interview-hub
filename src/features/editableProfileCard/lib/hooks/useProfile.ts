import { useCallback } from 'react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { useProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { useProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { useProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { useProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { profileActions } from '../../model/slice/profileSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const formData = useProfileForm();
    const isLoading = useProfileIsLoading();
    const error = useProfileError();
    const readonly = useProfileReadonly();
    const validateErrors = useProfileValidateErrors();

    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ firstname: value || '' }));
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || '' }));
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value || '' }));
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || '' }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || '' }));
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }));
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }));
        },
        [dispatch],
    );

    return {
        formData,
        error,
        isLoading,
        readonly,
        validateErrors,
        onChangeFirstname,
        onChangeLastname,
        onChangeUsername,
        onChangeAvatar,
        onChangeCountry,
        onChangeCurrency,
        onChangeAge,
        onChangeCity,
    };
};
