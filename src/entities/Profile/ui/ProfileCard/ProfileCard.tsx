import { DeprecatedProfileCardError } from '../DeprecatedProfileCard/DeprecatedProfileCardError/DeprecatedProfileCardError';
import { DeprecatedProfileCard } from '../DeprecatedProfileCard/DeprecatedProfileCard';
import { DeprecatedProfileCardLoader } from '../DeprecatedProfileCard/DeprecatedProfileCardLoader/DeprecatedProfileCardLoader';
import { RedesignedProfileCard } from '../RedesignedProfileCard/RedesignedProfileCard';
import { RedesignedProfileCardError } from '../RedesignedProfileCard/RedesignedProfileCardError/RedesignedProfileCardError';
import { RedesignedProfileCardSkeleton } from '../RedesignedProfileCard/RedesignedProfileCardSkeleton/RedesignedProfileCardSkeleton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { User } from '@/entities/User';

export interface ProfileCardProps {
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

export const ProfileCard = (props: ProfileCardProps) => {
    const { isLoading, error } = props;

    if (isLoading) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedProfileCardSkeleton />}
                off={<DeprecatedProfileCardLoader />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedProfileCardError />}
                off={<DeprecatedProfileCardError />}
            />
        );
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedProfileCard {...props} />}
            off={<DeprecatedProfileCard {...props} />}
        />
    );
};
