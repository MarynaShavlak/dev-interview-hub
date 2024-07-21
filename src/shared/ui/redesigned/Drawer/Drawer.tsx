import React, { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
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

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const height = window.innerHeight - 100;

const DrawerContent = memo(
    ({ className, children, isOpen, onClose }: DrawerProps) => {
        const { onCloseHandler, onDragHandler, style } = useDrawerAnimation({
            isOpen,
            onClose,
            height,
        });
        const { theme } = useTheme();
        const { Spring } = useAnimationLibs();

        if (!isOpen) return null;

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
                <div className={drawerClasses}>
                    <Overlay onClick={() => onCloseHandler()} />
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
    },
);

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();
    return isLoaded ? <DrawerContent {...props} /> : null;
};

export const Drawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
);

// import { toggleFeatures } from '@/shared/lib/features';
// import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
// import { classNames } from '@/shared/lib/classNames/classNames';
// import {
//     AnimationProvider,
//     useAnimationLibs,
// } from '@/shared/lib/components/AnimationProvider';
// import { Overlay } from '../Overlay/Overlay';
// import cls from './Drawer.module.scss';
// import { Portal } from '../Portal/Portal';
//
// interface DrawerProps {
//     className?: string;
//     children: ReactNode;
//     isOpen?: boolean;
//     onClose?: () => void;
//     lazy?: boolean;
// }
//
// const height = window.innerHeight - 100;
//
// export const DrawerContent = memo((props: DrawerProps) => {
//     const { className, children, onClose, isOpen, lazy } = props;
//     const { theme } = useTheme();
//     const { Spring, Gesture } = useAnimationLibs();
//     const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
//
//     const openDrawer = useCallback(() => {
//         api.start({ y: 0, immediate: false });
//     }, [api]);
//
//     useEffect(() => {
//         if (isOpen) {
//             openDrawer();
//         }
//     }, [api, isOpen, openDrawer]);
//
//     const onCloseHandler = (velocity = 0) => {
//         api.start({
//             y: height,
//             immediate: false,
//             config: { ...Spring.config.stiff, velocity },
//             onResolve: onClose,
//         });
//     };
//
//     const handleDrag = Gesture.useDrag(
//         ({
//             last,
//             velocity: [, vy],
//             direction: [, dy],
//             movement: [, my],
//             cancel,
//         }) => {
//             if (my < -70) cancel();
//
//             if (last) {
//                 if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
//                     onCloseHandler();
//                 } else {
//                     openDrawer();
//                 }
//             } else {
//                 api.start({ y: my, immediate: true });
//             }
//         },
//         {
//             from: () => [0, y.get()],
//             filterTaps: true,
//             bounds: { top: 0 },
//             rubberband: true,
//         },
//     );
//
//     if (!isOpen) {
//         return null;
//     }
//
//     const display = y.to((py) => (py < height ? 'block' : 'none'));
//     const drawerClasses = classNames(cls.Drawer, {}, [
//         className,
//         theme,
//         'app_drawer',
//         toggleFeatures({
//             name: 'isAppRedesigned',
//             on: () => cls.drawerRedesigned,
//             off: () => cls.drawerDeprecated,
//         }),
//     ]);
//
//     return (
//         <Portal element={document.getElementById('app') ?? document.body}>
//             <div className={drawerClasses}>
//                 <Overlay onClick={onCloseHandler} />
//                 <Spring.a.div
//                     className={cls.sheet}
//                     style={{
//                         display,
//                         bottom: `calc(-100vh + ${height - 100}px)`,
//                         y,
//                     }}
//                     {...handleDrag()}
//                 >
//                     {children}
//                 </Spring.a.div>
//             </div>
//         </Portal>
//     );
// });
//
// const DrawerAsync = (props: DrawerProps) => {
//     const { isLoaded } = useAnimationLibs();
//
//     if (!isLoaded) {
//         return null;
//     }
//
//     return <DrawerContent {...props} />;
// };
//
// export const Drawer = (props: DrawerProps) => {
//     return (
//         <AnimationProvider>
//             <DrawerAsync {...props} />
//         </AnimationProvider>
//     );
// };
