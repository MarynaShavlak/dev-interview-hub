import React from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../HeroSection.module.scss';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Button } from '@/shared/ui/redesigned/Button';

import heroImg from '@/shared/assets/images/hero-final-2.png';
import { AuthModal } from '@/features/AuthUser';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useHeroTranslations } from '../../../lib/hooks/useHeroTranslations/useHeroTranslations';

export const HeroSectionRedesigned = () => {
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
    return (
        <VStack align="center">
            <Text
                title={slogan}
                align="center"
                size="l"
                className={cls.title}
                variant="accent"
            />
            <HStack>
                <VStack gap="24" align="center">
                    <Text text={problemText} align="center" size="m" />
                    <Text
                        text={appSolutionText}
                        align="center"
                        size="m"
                        className={cls.logoText}
                    />
                    <VStack gap="16" align="center">
                        <Text text={subtext1} size="m" align="center" />
                        <Text text={subtext2} size="m" align="center" />
                    </VStack>
                    <Button
                        className={cls.startButton}
                        onClick={onShowModal}
                        variant="accent"
                    >
                        {entryButtonText}
                    </Button>
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
