import React, { InputHTMLAttributes, memo, ReactNode, useId } from 'react';
import { useInput } from '@/shared/lib/hooks/useInput/useInput';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '../Text';
import cls from './Input.module.scss';
import { HStack, VStack } from '../../common/Stack';
import {
    InputValidations,
    ValidationErrors,
} from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { FlexGap } from '@/shared/types/flexTypes';
import { ValidationErrorMessages } from '../../common/ValidationErrorMessages/ValidationErrorMessages';

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
    errors?: ValidationErrors;
    gap?: FlexGap;
    maxWidth?: boolean;
    labelBold?: boolean;
    maxLengthIndicator?: boolean;
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
        errors,
        gap = '4',
        maxWidth = true,
        labelBold = false,
        maxLengthIndicator = false,

        ...otherProps
    } = props;

    const generatedId = useId();

    const { ref, isFocused, onChangeHandler, onBlurHandler, onFocus, isDirty } =
        useInput({ autofocus, digitsOnly, onChange, onBlur });
    const currentInputLength = String(value).length;
    const maxInputLength = validations?.maxLength || Infinity;
    const isLimitExceeded = currentInputLength > maxInputLength;

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
        [cls.clear]: clear,
        [cls.withError]: isLimitExceeded,
    };
    const wrapperClasses = classNames(cls.InputWrapper, mods, [
        className,
        cls[size],
    ]);

    const input = (
        <div className={wrapperClasses}>
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
            <VStack max={maxWidth} gap={gap}>
                {!maxLengthIndicator && <Text text={label} bold={labelBold} />}
                {maxLengthIndicator && (
                    <HStack max justify="between">
                        <Text text={label} bold={labelBold} />
                        <span
                            className={classNames(
                                cls.InputLimit,
                                { [cls.isLimitExceeded]: isLimitExceeded },
                                [],
                            )}
                        >
                            <span>{currentInputLength}</span>/
                            <span>{maxInputLength}</span>
                        </span>
                    </HStack>
                )}
                {input}
                {errors && (
                    <ValidationErrorMessages
                        isDirty={isDirty}
                        value={value}
                        validations={validations}
                        errors={errors}
                    />
                )}{' '}
            </VStack>
        );
    }

    return input;
});
