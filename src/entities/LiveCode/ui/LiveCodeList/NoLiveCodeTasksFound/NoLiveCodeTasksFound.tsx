import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack } from '@/shared/ui/common/Stack';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleView } from '../../../model/consts/articleConsts';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../ArticleList.module.scss';

interface NoArticlesFoundProps {
    className?: string;
    view?: ArticleView;
}

export const NoLiveCodeTasksFound = memo((props: NoArticlesFoundProps) => {
    const { view, className } = props;
    const { t } = useTranslation('articles');
    const message = t('Статті не знайдено');

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => '',
        off: () => cls.ArticleList,
    });

    return (
        <HStack
            gap="16"
            className={classNames(mainClass, {}, [
                className,
                view ? cls[view] : '',
            ])}
            justify="center"
            align="center"
        >
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text size="m" title={message} />}
                off={<TextDeprecated size={TextSize.L} title={message} />}
            />
        </HStack>
    );
});
