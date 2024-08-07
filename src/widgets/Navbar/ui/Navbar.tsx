import React, { memo } from 'react';
import { useUserAuthData } from '@/entities/User';
import { NotAuthorizedNavbar } from './NotAuthorizedNavbar/NotAuthorizedNavbar';
import { AuthorizedNavbar } from './AuthorizedNavbar/AuthorizedNavbar';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useUserAuthData();

    if (authData) {
        return <AuthorizedNavbar className={className} />;
    }

    return <NotAuthorizedNavbar className={className} />;
});
