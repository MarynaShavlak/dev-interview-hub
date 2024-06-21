import { ReactElement } from 'react';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Article, ArticleTextBlock } from '../../../model/types/article';
import cls from './ArticleContent.module.scss';

interface ArticleContentProps {
    article: Article;
    textBlock?: ArticleTextBlock;
    types: ReactElement;
}

export const ArticleContent = ({ article, textBlock, types }: ArticleContentProps) => (
    <>
        <Text title={article.title} className={cls.title} />
        {types}
        <AppImage
            fallback={<Skeleton width="100%" height="250px" />}
            src={article.img}
            className={cls.img}
            alt={article.title}
        />
        {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
        )}
    </>
);
