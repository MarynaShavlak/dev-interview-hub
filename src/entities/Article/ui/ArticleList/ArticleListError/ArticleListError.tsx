import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleView } from '../../../model/consts/articleConsts';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../ArticleList.module.scss';

interface ArticleListErrorProps {
    className?: string;
    view: ArticleView;
}

interface ListErrorProps {
    message: string;
}

const DeprecatedArticleListError = memo(({ message }: ListErrorProps) => {
    return <TextDeprecated size={TextSize.L} title={message} />;
});
const RedesignedArticleListError = memo(({ message }: ListErrorProps) => {
    return <Text size="m" title={message} />;
});

export const ArticleListError = memo((props: ArticleListErrorProps) => {
    const { view, className } = props;
    const { t } = useTranslation('articles');
    const message = t('Статті не знайдено');

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListRedesigned,
        off: () => cls.ArticleList,
    });

    return (
        <HStack
            wrap="wrap"
            gap="16"
            className={classNames(mainClass, {}, [className, cls[view]])}
        >
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedArticleListError message={message} />}
                off={<DeprecatedArticleListError message={message} />}
            />
        </HStack>
    );
});
