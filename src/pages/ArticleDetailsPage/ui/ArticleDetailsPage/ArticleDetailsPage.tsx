import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article-details');
    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {t('Article Details')}
        </div>
    );
};

export default memo(ArticleDetailsPage);
