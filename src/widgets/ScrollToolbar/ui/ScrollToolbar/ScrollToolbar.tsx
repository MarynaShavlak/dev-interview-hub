import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { AppRoutes } from '@/shared/const/router/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useScrollToolbarActions } from '../../model/slices/scrollSlice';

interface ScrollToolbarProps {
    className?: string;
    page: AppRoutes;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
    const { className, page } = props;
    console.log('page', page);
    const dispatch = useAppDispatch();
    const { resetScrollStopArticleIndex } = useScrollToolbarActions();

    const handleClick = useCallback(() => {
        if (page === AppRoutes.ARTICLES) {
            dispatch(resetScrollStopArticleIndex());
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('reset');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [dispatch, page, resetScrollStopArticleIndex]);

    return (
        <VStack
            justify="center"
            align="center"
            max
            className={classNames(cls.ScrollToolbar, {}, [className])}
        >
            <ScrollToTopButton scrollToTop={handleClick} />
        </VStack>
    );
});
