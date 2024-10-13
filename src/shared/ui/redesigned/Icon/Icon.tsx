import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    'data-testid'?: string;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
    clickable: true;
    disabled?: boolean;
    onClick: (() => void) | ((event: unknown) => void);
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,

        'data-testid': dataTestId,
        ...otherProps
    } = props;

    const disabled =
        clickable && props.disabled !== undefined ? props.disabled : false;
    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={classNames(
                    cls.button,
                    { [cls.isDisabled]: disabled },
                    [],
                )}
                onClick={props.onClick}
                style={{ height, width }}
                data-testid={dataTestId}
                disabled={disabled}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
