import { memo } from 'react';
import DOMPurify from 'dompurify';
import { TestProps } from '@/shared/types/tests';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';
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

    return (
        <div
            className={classNames(
                cls.Text,
                { [cls.bold]: bold },
                additionalClasses,
            )}
        >
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {/* {text && ( */}
            {/*    <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}> */}
            {/*        {text} */}
            {/*    </p> */}
            {/* )} */}
            {sanitizedText && (
                <p
                    className={cls.text}
                    data-testid={`${dataTestId}.Paragraph`}
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            )}
        </div>
    );
});
