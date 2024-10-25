import React, { InputHTMLAttributes, memo, ReactNode, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useInput } from '@/shared/lib/hooks/useInput/useInput';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '../Text';
import cls from './Input.module.scss';
import { VStack } from '../../common/Stack';
import { useValidation } from '@/shared/lib/hooks/useValidation/useValidation';
import type { InputValidations } from '@/shared/lib/hooks/useValidation/useValidation';

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
    const { t } = useTranslation();

    const errors = useValidation(value, validations);
    console.log('errors', errors);
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
        EMPTY_FIELD = 'EMPTY_FIELD',
        INVALID_EMAIL = 'INVALID_EMAIL',
        MIN_LENGTH_VIOLATION = 'MIN_LENGTH_VIOLATION',
        MAX_LENGTH_VIOLATION = 'MAX_LENGTH_VIOLATION',
    }

    const validateInputErrorTranslates = {
        [ValidateInputError.EMPTY_FIELD]: t(
            'Поле є обов’язковим для заповнення',
        ),
        [ValidateInputError.INVALID_EMAIL]: t(
            'Невірний формат електронної пошти',
        ),
        [ValidateInputError.MIN_LENGTH_VIOLATION]: t(
            'Мінімальна довжина поля не відповідає вимогам',
        ),
        [ValidateInputError.MAX_LENGTH_VIOLATION]: t(
            'Максимальна довжина поля перевищена',
        ),
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
            <VStack max gap="4">
                <Text text={label} />
                {input}
                {isDirty && errors.isEmpty && (
                    <Text
                        size="s"
                        variant="error"
                        text={
                            validateInputErrorTranslates[
                                ValidateInputError.EMPTY_FIELD
                            ]
                        }
                    />
                )}
                {isDirty && !errors.isEmpty && errors.minLengthError && (
                    <Text
                        size="s"
                        variant="error"
                        text={
                            validateInputErrorTranslates[
                                ValidateInputError.MIN_LENGTH_VIOLATION
                            ]
                        }
                    />
                )}
                {isDirty && errors.maxLengthError && (
                    <Text
                        size="s"
                        variant="error"
                        text={
                            validateInputErrorTranslates[
                                ValidateInputError.MAX_LENGTH_VIOLATION
                            ]
                        }
                    />
                )}
                {isDirty && !errors.isEmpty && errors.emailError && (
                    <Text
                        size="s"
                        variant="error"
                        text={
                            validateInputErrorTranslates[
                                ValidateInputError.INVALID_EMAIL
                            ]
                        }
                    />
                )}
            </VStack>
        );
    }

    return input;
});
