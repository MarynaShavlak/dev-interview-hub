import { memo } from 'react';
import { useProfile } from '../../lib/hooks/useProfile/useProfile';
import { UserCard } from '../UserCard/UserCard';

export const EditableProfileCardContainer = memo(() => {
    const {
        formData,
        error,
        isLoading,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
        onChangeAge,
        onChangeCity,
        onFileUpload,
    } = useProfile();

    return (
        <UserCard
            data={formData}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeUsername={onChangeUsername}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
            onFileUpload={onFileUpload}
        />
    );
});
