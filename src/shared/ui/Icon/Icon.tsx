import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Icon.module.scss';

export enum IconSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface IconProps {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    inverted?:boolean;
    size?: IconSize
}

export const Icon = memo((props: IconProps) => {
    const {
        className, Svg, inverted, size = IconSize.M,
    } = props;

    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.Icon, { [cls[size]]: true }, [className])} />
    );
});
