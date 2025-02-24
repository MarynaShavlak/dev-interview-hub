import { memo } from 'react';
import DOMPurify from 'dompurify';
import { TestProps } from '@/shared/types/tests';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './Text.module.scss';
import { getStyleConfig } from './getStyleConfig';

export type TextVariant = 'primary' | 'error' | 'accent' | 'secondary';
export type TextAlign = 'right' | 'left' | 'center';
export type TextSize = 's' | 'm' | 'l';

interface TextProps extends TestProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    italic?: boolean;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        bold,
        italic,
        variant = 'primary',
        align = 'left',
        size = 'm',
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [
        className,
        cls[variant],
        cls[align],
        sizeClass,
    ].filter(Boolean);

    const sanitizedText = text ? DOMPurify.sanitize(text) : '';
    const isOnlyTitleOrText = Boolean((title && !text) || (!title && text));
    //
    // let bothTextAndTitleStyles;
    // let onlyTextOrTitleStyles;
    // if (isOnlyTitleOrText) {
    //     bothTextAndTitleStyles = { [cls.bold]: bold, [cls.italic]: italic };
    //     onlyTextOrTitleStyles = {};
    // } else {
    //     bothTextAndTitleStyles = {};
    //     onlyTextOrTitleStyles = { [cls.bold]: bold, [cls.italic]: italic };
    // }

    const { bothStyles, singleElementStyles } = getStyleConfig(
        bold,
        italic,
        isOnlyTitleOrText,
    );
    console.log('bothStyles', bothStyles);
    const textStyles = title ? {} : singleElementStyles;

    return (
        <div className={classNames(cls.Text, bothStyles, additionalClasses)}>
            {title && (
                <HeaderTag
                    className={classNames(cls.title, singleElementStyles, [])}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}

            {sanitizedText && (
                <p
                    className={classNames(cls.text, textStyles, [])}
                    data-testid={`${dataTestId}.Paragraph`}
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            )}
        </div>
    );
});
