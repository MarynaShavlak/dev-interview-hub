import { Article, ArticleTextBlock } from '../../../../../model/types/article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Categories } from '../../Categories/Categories';
import { ArticleTextBlockComponent } from '../../../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleBlockType } from '../../../../../model/consts/consts';
import cls from './ArticleContent.module.scss';

interface ArticleContentBaseProps {
    article: Article;
}

interface ArticleContentExtendedProps extends ArticleContentBaseProps {
    textBlock: ArticleTextBlock;
}

export const DeprecatedArticleContent = ({
    article,
    textBlock,
}: ArticleContentExtendedProps) => (
    <>
        <TextDeprecated title={article.title} />
        <Categories article={article} />
        <AppImage
            fallback={<SkeletonDeprecated width="100%" height="250px" />}
            src={article.img}
            className={cls.img}
            alt={article.title}
        />
        {textBlock && <ArticleTextBlockComponent block={textBlock} />}
    </>
);

export const RedesignedArticleContent = ({
    article,
    textBlock,
}: ArticleContentExtendedProps) => (
    <>
        <Text title={article.title} bold />
        <Text title={article.subtitle} size="s" />
        <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            className={cls.imgRedesigned}
            alt={article.title}
        />
        {textBlock?.paragraphs && (
            <Text
                className={cls.textBlock}
                text={textBlock.paragraphs.slice(0, 2).join(' ')}
            />
        )}
    </>
);

export const ArticleContent = ({ article }: ArticleContentBaseProps) => {
    const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <RedesignedArticleContent
                    article={article}
                    textBlock={textBlock}
                />
            }
            off={
                <DeprecatedArticleContent
                    article={article}
                    textBlock={textBlock}
                />
            }
        />
    );
};
