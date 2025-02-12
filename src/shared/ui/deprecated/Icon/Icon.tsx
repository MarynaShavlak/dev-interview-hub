import React, { memo, SVGProps } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './Icon.module.scss';

export type IconVariant = 'primary' | 'error';

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
    variant?: IconVariant;
}
/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        inverted,
        width,
        height,
        variant = 'primary',
        ...otherProps
    } = props;

    return (
        <Svg
            width={width}
            height={height}
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
                className,
                cls[variant],
            ])}
            {...otherProps}
        />
    );
});
