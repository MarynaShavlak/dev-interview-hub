import { CSSProperties, memo, useMemo } from 'react';
import { HStack } from '../Stack';
import { Text } from '../Text';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
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
    userName?: string;
}

export const Avatar = memo(
    ({ className, src, size = 100, alt, userName }: AvatarProps) => {
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
            <Icon width={size} height={size} Svg={UserIcon} />
        );
        const avatar = (
            <AppImage
                fallback={fallback}
                errorFallback={errorFallback}
                src={src}
                alt={alt}
                style={styles}
                className={classNames(cls.Avatar, mods, [])}
            />
        );

        if (!userName) {
            return avatar;
        }

        return (
            <HStack gap="8" className={className}>
                {avatar}
                <Text text={userName} bold />
            </HStack>
        );
    },
);
