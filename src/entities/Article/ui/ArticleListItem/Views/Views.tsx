import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIconDeprecated from '@/shared/assets/icons/eye-20-20.svg';
import EyeIconRedesigned from '@/shared/assets/icons/eye.svg';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Article } from '../../../model/types/article';
import cls from '../ArticleListItem.module.scss';

interface ViewsProps {
    article: Article;
}

export const Views = ({ article }: ViewsProps) => (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
            <HStack gap="8" className={cls.views}>
                <Icon Svg={EyeIconRedesigned} />
                <Text text={String(article.views)} />
            </HStack>
        }
        off={
            <HStack gap="8" className={cls.views}>
                <TextDeprecated text={String(article.views)} />
                <IconDeprecated Svg={EyeIconDeprecated} />
            </HStack>
        }
    />
);
