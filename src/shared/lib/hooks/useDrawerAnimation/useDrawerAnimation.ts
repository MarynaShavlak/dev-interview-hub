import { useCallback, useEffect } from 'react';
import { useAnimationLibs } from '../../components/AnimationProvider';

interface UseDrawerAnimationProps {
    isOpen: boolean;
    height: number;
    onClose?: () => void;
}

export const useDrawerAnimation = (props: UseDrawerAnimationProps) => {
    const { isOpen, height, onClose } = props;
    const { Spring, Gesture } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

    const openDrawer = useCallback(() => {
        api.start({
            y: 0,
            immediate: false,
        });
    }, [api]);

    useEffect(() => {
        if (isOpen) openDrawer();
    }, [isOpen, openDrawer]);

    const onCloseHandler = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: {
                ...Spring.config.stiff,
                velocity,
            },
            onResolve: onClose,
        });
    };

    const handleDrag = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();
            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    onCloseHandler();
                } else {
                    openDrawer();
                }
            } else {
                api.start({
                    y: my,
                    immediate: true,
                });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    return {
        y,
        openDrawer,
        onCloseHandler,
        handleDrag,
    };
};
