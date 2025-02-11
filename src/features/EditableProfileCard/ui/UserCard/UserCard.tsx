import { UserCardRedesigned } from './UserCardRedesigned/UserCardRedesigned';
import { UserCardErrorRedesigned } from './UserCardRedesigned/UserCardErrorRedesigned/UserCardErrorRedesigned';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { User } from '../../../../entities/User';
import { UserCardSkeletonRedesigned } from './UserCardRedesigned/UserCardSkeletonRedesigned/UserCardSkeletonRedesigned';
import { UserCardLoaderDeprecated } from './UserCardDeprecated/UserCardLoaderDeprecated/UserCardLoaderDeprecated';
import { UserCardErrorDeprecated } from './UserCardDeprecated/UserCardErrorDeprecated/UserCardErrorDeprecated';
import { UserCardDeprecated } from './UserCardDeprecated/UserCardDeprecated';

export interface UserCardProps {
    className?: string;
    data?: User;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
    onFileUpload: (file: File | null) => void;
}

export const UserCard = (props: UserCardProps) => {
    const { isLoading, error } = props;

    if (isLoading) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<UserCardSkeletonRedesigned />}
                off={<UserCardLoaderDeprecated />}
            />
        );
    }
    if (error) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<UserCardErrorRedesigned />}
                off={<UserCardErrorDeprecated />}
            />
        );
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<UserCardRedesigned {...props} />}
            off={<UserCardDeprecated {...props} />}
        />
    );
};
