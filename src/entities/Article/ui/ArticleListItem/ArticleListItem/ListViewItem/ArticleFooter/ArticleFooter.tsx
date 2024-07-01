import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Views } from '../../Views/Views';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Article } from '../../../../../model/types/article';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleFooterProps {
    article: Article;
}

const DeprecatedFooterBtn = ({ article }: ArticleFooterProps) => {
    const { t } = useTranslation('articles');
    return (
        <AppLinkDeprecated to={getRouteArticleDetails(article.id)}>
            <ButtonDeprecated theme={ButtonTheme.OUTLINE}>
                {t('Читати більше')}
            </ButtonDeprecated>
        </AppLinkDeprecated>
    );
};

const RedesignedFooterBtn = ({ article }: ArticleFooterProps) => {
    const { t } = useTranslation('articles');
    return (
        <AppLink to={getRouteArticleDetails(article.id)}>
            <Button variant="outline">{t('Читати більше')}</Button>
        </AppLink>
    );
};

export const ArticleFooter = ({ article }: ArticleFooterProps) => {
    return (
        <HStack justify="between" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedFooterBtn article={article} />}
                off={<DeprecatedFooterBtn article={article} />}
            />
            <Views article={article} />
        </HStack>
    );
};
