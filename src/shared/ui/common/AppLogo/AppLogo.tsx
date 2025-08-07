import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvgWithText from '@/shared/assets/icons/logoWithText.svg';
import AppSvg from '@/shared/assets/icons/logo.svg';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';

interface AppLogoProps {
    className?: string;
    size?: number;
    withText?: boolean;
    max?: boolean;
}

export const AppLogo = memo(
    ({ className, size = 50, withText = false, max = true }: AppLogoProps) => {
        const logoClass = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.appLogoRedesigned,
            off: () => cls.appLogoDeprecated,
        });

        return (
            <HStack
                max={max}
                justify="center"
                className={classNames(cls.appLogoWrapper, {}, [className])}
            >
                {withText ? (
                    <AppSvgWithText
                        width={size}
                        height={size}
                        className={logoClass}
                    />
                ) : (
                    <AppSvg width={size} height={size} className={logoClass} />
                )}

                <div className={cls.gradientBig} />
                <div className={cls.gradientSmall} />
            </HStack>
        );
    },
);
