import { CSSProperties, memo, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../redesigned/AppImage';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Skeleton } from '../Skeleton';
import { Icon } from '../Icon';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}
/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */

export const Avatar = memo(
    ({ className, src, size = 100, alt, fallbackInverted }: AvatarProps) => {
        const mods: Mods = {};

        const styles = useMemo<CSSProperties>(
            () => ({
                width: size,
                height: size,
            }),
            [size],
        );

        const fallback = <Skeleton width={size} height={size} border="50%" />;
        const errorFallback = (
            <Icon
                inverted={fallbackInverted}
                width={size}
                height={size}
                Svg={UserIcon}
            />
        );

        return (
            <AppImage
                fallback={fallback}
                errorFallback={errorFallback}
                src={src}
                alt={alt}
                style={styles}
                className={classNames(cls.Avatar, mods, [className])}
            />
        );
    },
);
