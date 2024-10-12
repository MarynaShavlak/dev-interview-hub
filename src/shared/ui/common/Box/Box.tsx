import React from 'react';

type BoxProps = {
    width?: string | number;
    height?: string | number;
    backgroundColor?: string;
    className?: string;
    children?: React.ReactNode;
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void;
};

export const Box = (props: BoxProps) => {
    const {
        width,
        height,
        className,
        children,
        onMouseDown,
        onTouchStart,
        backgroundColor,
    } = props;
    return (
        <div
            className={className}
            style={{ width, height, backgroundColor }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
        >
            {children}
        </div>
    );
};
