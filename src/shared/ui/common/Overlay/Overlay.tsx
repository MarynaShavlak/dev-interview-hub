import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './Overlay.module.scss';
import { TestProps } from '@/shared/types/tests';

interface OverlayProps extends TestProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick, 'data-testid': dataTestId } = props;

    return (
        <div
            data-testid={dataTestId}
            onClick={onClick}
            className={classNames(cls.Overlay, {}, [className])}
        />
    );
});
