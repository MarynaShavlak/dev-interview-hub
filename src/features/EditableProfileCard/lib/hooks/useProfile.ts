import { useCallback } from 'react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { useProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { useProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { useProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { useProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { useProfileActions } from '../../model/slices/profileSlice';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';

/**
 * Custom hook for managing profile data and updates.
 *
 * @returns {{
 *    formData: object;
 *    isLoading: boolean;
 *    error: object | null;
 *    readonly: boolean;
 *    validateErrors: object | undefined;
 *    onChangeFirstname: (value?: string) => void;
 *    onChangeLastname: (value?: string) => void;
 *    onChangeUsername: (value?: string) => void;
 *    onChangeAvatar: (value?: string) => void;
 *    onChangeCountry: (country: Country) => void;
 *    onChangeCurrency: (currency: Currency) => void;
 *    onChangeAge: (value?: string) => void;
 *    onChangeCity: (value?: string) => void;
 *  }} An object with the following properties:
 *  * `formData`: The current profile form data, including fields such as firstname, lastname, etc.
 *  * `isLoading`: Boolean indicating whether the profile data is currently being fetched.
 *  * `error`: An error object if an error occurred while fetching the profile data, or `null` otherwise.
 *  * `readonly`: Boolean indicating whether the profile form is read-only.
 *  * `validateErrors`: An object containing validation errors related to the profile form, or `undefined` if none.
 *  * `onChangeFirstname`: Function to update the profile's firstname with the provided value.
 *  * `onChangeLastname`: Function to update the profile's lastname with the provided value.
 *  * `onChangeUsername`: Function to update the profile's username with the provided value.
 *  * `onChangeAvatar`: Function to update the profile's avatar with the provided value.
 *  * `onChangeCountry`: Function to update the profile's country with the provided `Country` object.
 *  * `onChangeCurrency`: Function to update the profile's currency with the provided `Currency` object.
 *  * `onChangeAge`: Function to update the profile's age with the provided value.
 *  * `onChangeCity`: Function to update the profile's city with the provided value.
 *
 */

export const useProfile = () => {
    const formData = useProfileForm();
    const isLoading = useProfileIsLoading();
    const error = useProfileError();
    const readonly = useProfileReadonly();
    const validateErrors = useProfileValidateErrors();
    const { updateProfile } = useProfileActions();

    const validConfig = useInputValidationConfig();
    const { username = '', firstname = '', lastname = '' } = formData || {};

    const { hasErrors } = useFormValidation(
        { username, firstname, lastname },
        validConfig,
        'profile',
    );

    const onChangeFirstname = useCallback(
        (value?: string) => {
            updateProfile({ firstname: value || '' });
        },
        [updateProfile],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            updateProfile({ lastname: value || '' });
        },
        [updateProfile],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            updateProfile({ city: value || '' });
        },
        [updateProfile],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            updateProfile({ age: value || '' });
        },
        [updateProfile],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            updateProfile({ username: value || '' });
        },
        [updateProfile],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            updateProfile({ avatar: value || '' });
        },
        [updateProfile],
    );

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            updateProfile({ currency });
        },
        [updateProfile],
    );

    const onChangeCountry = useCallback(
        (country: Country) => {
            updateProfile({ country });
        },
        [updateProfile],
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
        hasErrors,
    };
};
