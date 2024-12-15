import React, {
    InputHTMLAttributes,
    memo,
    ReactNode,
    useId,
    useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useInput } from '@/shared/lib/hooks/useInput/useInput';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '../Text';
import cls from './Input.module.scss';
import { VStack } from '../../common/Stack';
import {
    ValidationErrors,
    InputValidations,
} from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { FlexGap } from '@/shared/types/flexTypes';

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
}

interface ValidationErrorMessagesProps {
    isDirty: boolean;
    value?: string | number;
    validations?: InputValidations;
    errors: ValidationErrors;
}

const ValidationErrorMessages = memo(
    ({ isDirty, value, validations, errors }: ValidationErrorMessagesProps) => {
        const { t } = useTranslation();

        const validationMessages = useMemo(
            () => ({
                EMPTY_FIELD: t('Поле є обов’язковим для заповнення'),
                INVALID_EMAIL: t('Невірний формат електронної пошти'),
                MIN_LENGTH_VIOLATION: t(
                    'Мінімальна довжина поля не відповідає вимогам',
                ),
                MAX_LENGTH_VIOLATION: t('Максимальна довжина поля перевищена'),
                INVALID_USERNAME: t("Неправильне ім'я користувача"),
            }),
            [t],
        );
        if (!isDirty) return null;
        return (
            <>
                {errors.isEmpty && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.EMPTY_FIELD}
                    />
                )}
                {!errors.isEmpty && errors.minLengthError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.MIN_LENGTH_VIOLATION}
                    />
                )}
                {errors.maxLengthError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.MAX_LENGTH_VIOLATION}
                    />
                )}
                {!errors.isEmpty && errors.emailError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.INVALID_EMAIL}
                    />
                )}
                {!errors.isEmpty && errors.usernameError && (
                    <Text
                        size="s"
                        variant="error"
                        text={validationMessages.INVALID_USERNAME}
                    />
                )}
            </>
        );
    },
);

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

        ...otherProps
    } = props;

    const generatedId = useId();

    const { ref, isFocused, onChangeHandler, onBlurHandler, onFocus, isDirty } =
        useInput({ autofocus, digitsOnly, onChange, onBlur });

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
        [cls.clear]: clear,
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
                <Text text={label} />
                {input}
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
    }

    return input;
});
