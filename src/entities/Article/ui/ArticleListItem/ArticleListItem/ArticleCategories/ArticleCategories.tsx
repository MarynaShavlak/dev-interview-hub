import { Article } from '../../../../model/types/article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticleCategories.module.scss';

interface CategoriesProps {
    article: Article;
}

export const ArticleCategories = ({ article }: CategoriesProps) => (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
            <Text
                text={article.category.join(', ')}
                className={cls.categories}
            />
        }
        off={
            <TextDeprecated
                text={article.category.join(', ')}
                className={cls.categories}
            />
        }
    />
);
