import React from 'react';
import {
    Text,
    TextAlign,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import cls from '../HeroSection.module.scss';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import heroImg from '@/shared/assets/images/hero-final-2.png';
import { AuthModal } from '@/features/AuthUser';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useHeroTranslations } from '../../../lib/hooks/useHeroTranslations/useHeroTranslations';
import { useUserAuthData } from '@/entities/User';

export const HeroSectionDeprecated = () => {
    const {
        entryButtonText,
        slogan,
        problemText,
        appSolutionText,
        subtext1,
        subtext2,
        heroImageDesc,
    } = useHeroTranslations();

    const {
        isVisible: isAuthModal,
        show: onShowModal,
        hide: onCloseModal,
    } = useToggleVisibility();
    const authData = useUserAuthData();
    return (
        <VStack align="center">
            <Text
                title={slogan}
                align={TextAlign.CENTER}
                size={TextSize.L}
                className={cls.title}
                theme={TextTheme.PRIMARY}
            />
            <HStack>
                <VStack gap="24" align="center">
                    <Text
                        text={problemText}
                        align={TextAlign.CENTER}
                        size={TextSize.M}
                    />
                    <Text
                        text={appSolutionText}
                        align={TextAlign.CENTER}
                        size={TextSize.M}
                        className={cls.logoTextDeprecated}
                    />
                    <VStack gap="16" align="center">
                        <Text
                            text={subtext1}
                            size={TextSize.M}
                            align={TextAlign.CENTER}
                        />
                        <Text
                            text={subtext2}
                            size={TextSize.M}
                            align={TextAlign.CENTER}
                        />
                    </VStack>
                    {!authData && (
                        <Button
                            className={cls.startButton}
                            onClick={onShowModal}
                            theme={ButtonTheme.BACKGROUND_INVERTED}
                        >
                            {entryButtonText}
                        </Button>
                    )}
                </VStack>
                <img
                    src={heroImg}
                    className={cls.heroImg}
                    alt={heroImageDesc}
                />
            </HStack>
            {isAuthModal && (
                <AuthModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </VStack>
    );
};
