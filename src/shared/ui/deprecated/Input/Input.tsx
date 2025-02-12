import React, { InputHTMLAttributes, memo } from 'react';
import { useInput } from '@/shared/lib/hooks/useInput/useInput';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import cls from './Input.module.scss';
import {
    InputValidations,
    ValidationErrors,
} from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

import { HStack, VStack } from '../../common/Stack';
import { ValidationErrorMessages } from '../../common/ValidationErrorMessages/ValidationErrorMessages';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    digitsOnly?: boolean;
    validations?: InputValidations;
    errors?: ValidationErrors;
    maxWidth?: boolean;
    maxLengthIndicator?: boolean;
    withBorder?: boolean;
}

/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        digitsOnly = false,
        validations,
        errors,
        maxWidth = true,
        maxLengthIndicator = false,
        withBorder = false,
        ...otherProps
    } = props;

    const {
        ref,
        isFocused,
        onChangeHandler,
        onBlurHandler,
        onFocus,
        onSelect,
        caretPosition,
        isDirty,
    } = useInput({ autofocus, digitsOnly, onChange });
    const currentInputLength = String(value).length;
    const maxInputLength = validations?.maxLength || Infinity;
    const isLimitExceeded = currentInputLength > maxInputLength;

    const isCaretVisible = isFocused && !readonly;

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.withError]: isLimitExceeded,
        [cls.withBorder]: withBorder,
    };

    const placeholderMods: Mods = {
        [cls.withErrorPlaceholder]: isLimitExceeded,
    };
    const inputEl = ref.current;
    const inputWidth = inputEl?.getBoundingClientRect().width ?? 0;

    const finalPosition =
        caretPosition * 9 > inputWidth ? inputWidth - 9 : caretPosition * 9;

    const input = (
        <div className={cls.caretWrapper}>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlurHandler}
                onSelect={onSelect}
                readOnly={readonly}
                {...otherProps}
            />
            {isCaretVisible && (
                <span
                    className={cls.caret}
                    style={{ left: `${finalPosition}px` }}
                />
            )}
        </div>
    );
    return (
        <VStack
            max={maxWidth}
            gap="4"
            className={classNames(cls.wrap, {}, [className])}
        >
            {maxLengthIndicator && (
                <HStack max justify="end" className={cls.limitWrap}>
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
            <div className={classNames(cls.InputWrapper, mods, [])}>
                {placeholder && (
                    <div
                        className={classNames(
                            cls.placeholder,
                            placeholderMods,
                            [],
                        )}
                    >{`${placeholder}>`}</div>
                )}
                {input}
            </div>
            {errors && (
                <ValidationErrorMessages
                    isDirty={isDirty}
                    value={value}
                    validations={validations}
                    errors={errors}
                />
            )}
        </VStack>
    );
});
