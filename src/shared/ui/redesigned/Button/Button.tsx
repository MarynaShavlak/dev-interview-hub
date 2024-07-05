import {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef,
    ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled' | 'save' | 'cancel';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /**
     * Варіант кнопки. Відповідає за візуальний стиль (у рамці, без стилів)
     */
    variant?: ButtonVariant;
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
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = 'outline',
            square,
            disabled,
            max,
            addonLeft,
            addonRight,
            size = 'm',
            ...otherProps
        } = props;

        const mods: Mods = {
            [cls.square]: square,
            [cls.disabled]: disabled,
            [cls.max]: max,
            [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
        };

        return (
            <button
                type="button"
                className={classNames(cls.Button, mods, [
                    className,
                    cls[variant],
                    cls[size],
                ])}
                disabled={disabled}
                {...otherProps}
                ref={ref}
            >
                <div className={cls.addonLeft}>{addonLeft}</div>
                {children}
                <div className={cls.addonRight}>{addonRight}</div>
            </button>
        );
    },
);
