import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
    className?: string;
    scrollToTop: () => void;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className, scrollToTop } = props;

    return (
        <Icon
            Svg={CircleIcon}
            clickable
            onClick={scrollToTop}
            width={32}
            height={32}
            className={classNames('', {}, [className])}
        />
    );
});
