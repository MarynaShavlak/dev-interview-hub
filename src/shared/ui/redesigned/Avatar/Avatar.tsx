import { CSSProperties, memo, useMemo } from 'react';
import { HStack } from '../../common/Stack';
import { Text } from '../Text';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../common/AppImage';
import UserIcon from '../../../assets/icons/user-filled.svg';
import { Skeleton } from '../Skeleton';
import { Icon } from '../Icon';
import { truncateText } from '@/shared/lib/text/truncateText/truncateText';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    userName?: string;
    textLength?: number;
}

export const Avatar = memo(
    ({
        className,
        src,
        size = 100,
        alt,
        userName,
        textLength,
    }: AvatarProps) => {
        const mods: Mods = {};

        const styles = useMemo<CSSProperties>(
            () => ({
                width: size,
                height: size,
            }),
            [size],
        );

        const fallback = (
            <Skeleton
                width={size}
                height={size}
                border="50%"
                className={className}
            />
        );
        const errorFallback = (
            <Icon
                width={size}
                height={size}
                Svg={UserIcon}
                className={className}
            />
        );
        const avatar = (
            <AppImage
                fallback={fallback}
                errorFallback={errorFallback}
                src={src}
                alt={alt}
                style={styles}
                className={classNames(cls.Avatar, mods, [className])}
            />
        );

        if (!userName) {
            return avatar;
        }
        const truncatedUserName =
            textLength && userName.length > textLength
                ? `${truncateText(userName, textLength - 3)}`
                : userName;

        return (
            <HStack gap="8" className={className}>
                {avatar}
                <Text text={truncatedUserName} bold />
            </HStack>
        );
    },
);
