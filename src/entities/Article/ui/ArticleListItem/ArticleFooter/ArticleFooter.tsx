import { useTranslation } from 'react-i18next';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Article } from '../../../model/types/article';
import cls from './ArticleFooter.module.scss';

export const ArticleFooter = ({
    article,
    views,
}: {
    article: Article;
    views: JSX.Element;
}) => {
    const { t } = useTranslation('articles');
    return (
        <div className={cls.footer}>
            <AppLink to={getRouteArticleDetails(article.id)}>
                <Button theme={ButtonTheme.OUTLINE}>
                    {t('Читати більше')}
                </Button>
            </AppLink>
            {views}
        </div>
    );
};
