import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Article } from '../../../model/types/article';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface ArticleHeaderProps {
    article: Article;
}

const DeprecatedHeader = ({ article }: ArticleHeaderProps) => {
    return (
        <>
            <HStack gap="8" max>
                <AvatarDeprecated size={30} src={article.user.avatar} />
                <TextDeprecated text={article.user.username} />
            </HStack>
            <TextDeprecated text={article.createdAt} />
        </>
    );
};

const RedesignedHeader = ({ article }: ArticleHeaderProps) => {
    return (
        <HStack gap="8" max>
            <Avatar size={32} src={article.user.avatar} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
        </HStack>
    );
};

export const ArticleHeader = ({ article }: ArticleHeaderProps) => {
    return (
        <VStack gap="8" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedHeader article={article} />}
                off={<DeprecatedHeader article={article} />}
            />
        </VStack>
    );
};
