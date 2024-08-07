import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthModal } from '../../lib/hooks/useAuthModal';
import { LoginModal } from '@/features/AuthByUsername';
import { Button } from '@/shared/ui/redesigned/Button';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../Navbar.module.scss';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';

interface NavbarProps {
    className?: string;
}

export const NotAuthorizedNavbar = memo(({ className }: NavbarProps) => {
    const { isAuthModal, onShowModal, onCloseModal } = useAuthModal();
    const { t } = useTranslation();
    const entryButtonText = t('Вхід');

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    });

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Button
                        variant="clear"
                        className={cls.links}
                        onClick={onShowModal}
                    >
                        {entryButtonText}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={cls.links}
                        onClick={onShowModal}
                    >
                        {entryButtonText}
                    </ButtonDeprecated>
                }
            />

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});
