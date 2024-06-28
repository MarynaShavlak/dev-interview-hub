import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <VStack
        max
        justify="center"
        align="center"
        className={classNames(cls.PageLoader, {}, [className])}
    >
        <Loader />
    </VStack>
);
