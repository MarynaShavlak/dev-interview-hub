import { useCallback, useEffect } from 'react';
import { useAnimationLibs } from '../../components/AnimationProvider';

/**
 * Custom hook for managing the animation and gesture handling of a drawer component.
 * @param {Object} props - Configuration object for the drawer animation.
 * @param {boolean} props.isOpen - A boolean indicating whether the drawer is currently open.
 * @param {number} props.height - The height of the drawer in pixels.
 * @param {() => void} [props.onClose] - Optional callback function that is invoked when the drawer is closed.
 *
 * @returns {{
 *    style: React.CSSProperties;
 *    onCloseHandler: (velocity?: number) => void;
 *    onDragHandler: (state: GestureState) => void;
 *  }} An object with the following properties:
 *  * `style`: CSS style properties to be applied to the drawer, including its position and display settings.
 *  * `onCloseHandler`: Function to animate closing the drawer, with optional velocity control.
 *  * `onDragHandler`: Gesture handler function for dragging the drawer, managing its position based on user interaction.
 */

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

    const display = y.to((py) => (py < height ? 'block' : 'none'));
    const style = {
        display,
        bottom: `calc(-100vh + ${height - 100}px)`,
        y,
    };

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

    const onDragHandler = Gesture.useDrag(
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
        onCloseHandler,
        onDragHandler,
        style,
    };
};
