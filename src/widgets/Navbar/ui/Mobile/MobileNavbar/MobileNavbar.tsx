import React, { memo } from 'react';
import cls from './MobileNavbar.module.scss';
import { HStack } from '@/shared/ui/common/Stack';
import { AppLogo } from '@/shared/ui/common/AppLogo';
import { Text } from '@/shared/ui/redesigned/Text';
import { Navbar } from '../../Navbar';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

interface MobileNavbarProps {
    className?: string;
}

export const MobileNavbar = memo(({ className }: MobileNavbarProps) => {
    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <HStack align="center" gap="8">
                <AppLogo size={50} max={false} />
                <Text
                    className={cls.appName}
                    text="DEV INTERVIEW HUB"
                    size="s"
                />
            </HStack>
            <Navbar />
        </div>
    );
});
