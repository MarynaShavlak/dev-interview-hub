import React, { InputHTMLAttributes, memo, ReactNode, useId } from 'react';
import { useInput } from '@/shared/lib/hooks/useInput/useInput';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '../Text';
import cls from './Input.module.scss';
import { VStack } from '../../common/Stack';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
    className?: string;
    label?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    size?: InputSize;
    digitsOnly?: boolean;
    clear?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        label,
        value,
        size = 'm',
        onChange,
        onBlur,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        digitsOnly = false,
        clear = false,

        ...otherProps
    } = props;

    const generatedId = useId();

    const { ref, isFocused, onChangeHandler, onBlurHandler, onFocus } =
        useInput({ autofocus, digitsOnly, onChange, onBlur });
    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
        [cls.clear]: clear,
    };

    const input = (
        <div
            className={classNames(cls.InputWrapper, mods, [
                className,
                cls[size],
            ])}
        >
            {/* {label && <label htmlFor={generatedId}>{label}</label>} */}
            <div className={cls.addonLeft}>{addonLeft}</div>
            <input
                id={generatedId}
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlurHandler}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
            <div className={cls.addonRight}>{addonRight}</div>
        </div>
    );

    if (label) {
        return (
            <VStack max gap="8">
                <Text text={label} />
                {input}
            </VStack>
        );
    }

    return input;
});
