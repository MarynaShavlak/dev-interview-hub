import React, { memo } from 'react';
import {
    AuthorizedDeprecatedNavbar,
    NotAuthorizedDeprecatedNavbar,
} from './DeprecatedNavbar/DeprecatedNavbar';
import {
    AuthorizedRedesignedNavbar,
    NotAuthorizedRedesignedNavbar,
} from './RedesignedNavbar/RedesignedNavbar';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useUserAuthData } from '@/entities/User';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useUserAuthData();

    if (authData) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<AuthorizedRedesignedNavbar className={className} />}
                off={<AuthorizedDeprecatedNavbar className={className} />}
            />
        );
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<NotAuthorizedRedesignedNavbar className={className} />}
            off={<NotAuthorizedDeprecatedNavbar className={className} />}
        />
    );
});
