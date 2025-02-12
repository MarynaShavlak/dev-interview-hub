import React, { ReactNode } from 'react';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { TestProps } from '@/shared/types/tests';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { Icon } from '../../redesigned/Icon';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import { Button, ButtonTheme } from '../../deprecated/Button';

interface ModalProps extends TestProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
        'data-testid': dataTestId,
    } = props;
    const { isClosing, isMounted, close } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    const classes = [
        className,
        theme,
        'app_modal',
        toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalRedesigned,
            off: () => cls.modalDeprecated,
        }),
    ];
    const contentClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.contentRedesigned,
        off: () => cls.contentDeprecated,
    });

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(cls.Modal, mods, [...classes])}
                data-testid={dataTestId}
            >
                <Overlay onClick={close} />
                <div className={contentClass}>
                    {onClose && (
                        <ToggleFeaturesComponent
                            feature="isAppRedesigned"
                            on={
                                <Icon
                                    variant="error"
                                    Svg={CloseIcon}
                                    className={cls.closeIconRedesigned}
                                    clickable
                                    onClick={onClose}
                                />
                            }
                            off={
                                <Button
                                    theme={ButtonTheme.CLEAR}
                                    onClick={onClose}
                                >
                                    <IconDeprecated
                                        Svg={CloseIcon}
                                        width={32}
                                        height={32}
                                        className={cls.closeIconDeprecated}
                                    />
                                </Button>
                            }
                        />
                    )}

                    {children}
                </div>
            </div>
        </Portal>
    );
};
