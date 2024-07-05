import {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef,
    ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
    OUTLINE_RED = 'outline_red',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /**
     * Тема кнопки. Відповідає за візуальний стиль (у рамці, без стилів, протилежний кольору теми додатка тощо)
     */
    theme?: ButtonTheme;
    /**
     * Прапорець, що робить кнопку квадратною
     */
    square?: boolean;
    /**
     * Розмір кнопки відповідно до дизайн-системи
     */
    size?: ButtonSize;
    /**
     * Прапорець, що відповідає за працездатність кнопки
     */
    disabled?: boolean;
    /**
     * Вміст кнопки
     */
    children?: ReactNode;
    /**
     * Розширює кнопку на всю доступну ширину
     */
    max?: boolean;
}
/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            theme = ButtonTheme.OUTLINE,
            square,
            disabled,
            max,
            size = ButtonSize.M,
            ...otherProps
        } = props;

        const mods: Mods = {
            [cls[theme]]: true,
            [cls.square]: square,
            [cls[size]]: true,
            [cls.disabled]: disabled,
            [cls.max]: max,
        };

        return (
            <button
                type="button"
                className={classNames(cls.Button, mods, [className])}
                disabled={disabled}
                ref={ref}
                {...otherProps}
            >
                {children}
            </button>
        );
    },
);
