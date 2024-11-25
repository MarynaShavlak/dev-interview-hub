import { RedesignedUserCard } from './RedesignedUserCard/RedesignedUserCard';
import { RedesignedUserCardError } from './RedesignedUserCard/RedesignedUserCardError/RedesignedUserCardError';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { User } from '../../../../entities/User';
import { RedesignedUserCardSkeleton } from './RedesignedUserCard/RedesignedUserCardSkeleton/RedesignedUserCardSkeleton';
import { DeprecatedUserCardLoader } from './DeprecatedProfileCard/DeprecatedUserCardLoader/DeprecatedUserCardLoader';
import { DeprecatedUserCardError } from './DeprecatedProfileCard/DeprecatedUserCardError/DeprecatedUserCardError';
import { DeprecatedUserCard } from './DeprecatedProfileCard/DeprecatedProfileCard';

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
}

export const UserCard = (props: UserCardProps) => {
    const { isLoading, error } = props;

    if (isLoading) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedUserCardSkeleton />}
                off={<DeprecatedUserCardLoader />}
            />
        );
    }
    if (error) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedUserCardError />}
                off={<DeprecatedUserCardError />}
            />
        );
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedUserCard {...props} />}
            off={<DeprecatedUserCard {...props} />}
        />
    );
};
