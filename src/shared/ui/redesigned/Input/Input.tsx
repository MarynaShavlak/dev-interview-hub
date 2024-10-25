import React, { InputHTMLAttributes, memo, ReactNode, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useInput, useValidation } from '@/shared/lib/hooks/useInput/useInput';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '../Text';
import cls from './Input.module.scss';
import { VStack } from '../../common/Stack';
import { ValidateProfileError } from '@/features/EditableProfileCard';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

export interface InputValidations {
    isEmpty?: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
}

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
    validations?: InputValidations;
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
        validations,

        ...otherProps
    } = props;

    const generatedId = useId();
    const { t } = useTranslation('');

    const valid = useValidation(value, validations);
    console.log('valid', valid);
    const { ref, isFocused, onChangeHandler, onBlurHandler, onFocus, isDirty } =
        useInput({ autofocus, digitsOnly, onChange, onBlur });
    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
        [cls.clear]: clear,
    };

    enum ValidateInputError {
        INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
        INCORRECT_USERNAME = 'INCORRECT_USERNAME',
        INCORRECT_AGE = 'INCORRECT_AGE',
        NO_DATA = 'NO_DATA',
        SERVER_ERROR = 'SERVER_ERROR',
    }

    const validateInputErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t(
            'Помилка сервера при збереженні даннних',
        ),
        [ValidateProfileError.NO_DATA]: t('Дані не вказано'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t(
            "Прізвище та ім'я є обов'язковими полями",
        ),
        [ValidateProfileError.INCORRECT_USERNAME]: t(
            "Ім'я користувача є обов'язковим полем",
        ),
        [ValidateProfileError.INCORRECT_AGE]: t('Некоректний формат віку'),
    };

    const input = (
        <div
            className={classNames(cls.InputWrapper, mods, [
                className,
                cls[size],
            ])}
        >
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
                {valid.isEmpty && isDirty && <p>111111</p>}
                <Text text={label} />
                {input}
            </VStack>
        );
    }

    return input;
});
