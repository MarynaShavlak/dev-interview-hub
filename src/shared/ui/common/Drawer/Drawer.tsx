import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import {
    AnimationProvider,
    useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider';
import { toggleFeatures } from '@/shared/lib/features';
import { useDrawerAnimation } from '@/shared/lib/hooks/useDrawerAnimation/useDrawerAnimation';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';
import { TestProps } from '@/shared/types/tests';

interface DrawerProps extends TestProps {
    children: ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    lazy?: boolean;
    className?: string;
}

const height = window.innerHeight - 100;

const DrawerContent = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
        'data-testid': dataTestId,
    } = props;
    const { onCloseHandler, onDragHandler, style } = useDrawerAnimation({
        isOpen,
        onClose,
        height,
    });
    const { theme } = useTheme();
    const { Spring } = useAnimationLibs();

    if (lazy && !isOpen) return null;

    const drawerClasses = classNames(cls.Drawer, {}, [
        className,
        theme,
        'app_drawer',
        toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.drawerRedesigned,
            off: () => cls.drawerDeprecated,
        }),
    ]);

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={drawerClasses} data-testid={dataTestId}>
                <Overlay
                    onClick={() => onCloseHandler()}
                    data-testid="drawer-overlay"
                />
                <Spring.a.div
                    className={cls.sheet}
                    style={style}
                    {...onDragHandler()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
});

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();
    return isLoaded ? <DrawerContent {...props} /> : null;
};

export const Drawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
);
