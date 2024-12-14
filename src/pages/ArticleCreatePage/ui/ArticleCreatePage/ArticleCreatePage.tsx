import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/common/Stack';

interface ArticleCreatePageProps {
    className?: string;
}

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            <VStack gap="24">
                <Text title={t('Створення нової статті')} size="l" />
                <VStack>
                    <Text text={t('Заголовок статті')} bold />
                </VStack>
            </VStack>
        </Page>
    );
});

export default ArticleCreatePage;
