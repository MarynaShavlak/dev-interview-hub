import { memo } from 'react';
import DOMPurify from 'dompurify';
import { TestProps } from '@/shared/types/tests';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import cls from './Text.module.scss';
import { VStack } from '../../common/Stack';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
    JUSTIFY = 'justify',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface TextProps extends TestProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    withTags?: boolean;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};
/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        withTags = false,
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    };
    const additionalClasses = [className].filter(Boolean);
    const sanitizedText = text ? DOMPurify.sanitize(text) : '';

    return (
        <VStack className={classNames('', mods, additionalClasses)} gap="8">
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {!withTags && sanitizedText && (
                <p
                    className={cls.text}
                    data-testid={`${dataTestId}.Paragraph`}
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            )}
            {withTags && (
                <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </VStack>
    );
});
