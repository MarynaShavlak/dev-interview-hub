import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

import cls from '../LiveCodeCard.module.scss';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteLiveCodeTaskDetails } from '@/shared/const/router/router';
import { SectionType } from '@/shared/types/sectionTypes';
import { LiveCodeCardProps } from '../LiveCodeCard';
import { LiveCodeBlock } from '../../../model/types/liveCode';

export const LiveCodeCardDeprecated = memo((props: LiveCodeCardProps) => {
    const { className, liveCodeTask, target, handleClick } = props;
    const { t } = useTranslation('articles');
    const { createdAt, title, id, user, category, blocks } = liveCodeTask;
    const codeBlock = blocks.find(
        (block) => block.type === SectionType.CODE,
    ) as LiveCodeBlock;
    const additionalClasses = getFlexClasses({ vStack: true, gap: '16' });

    return (
        <AppLink
            target={target}
            to={getRouteLiveCodeTaskDetails(id)}
            className={cls.LiveCodeItemRedesigned}
            onClick={handleClick}
        >
            <div>{title}</div>
        </AppLink>
        // <div
        //     className={classNames(cls.ArticleListItemRedesigned, {}, [
        //         className,
        //         cls.LIST,
        //     ])}
        // >
        //     <Card
        //         className={classNames('', {}, additionalClasses)}
        //         padding="16"
        //     >
        //         <VStack gap="8" max>
        //             <HStack gap="8" max>
        //                 <Avatar
        //                     size={32}
        //                     src={user.avatar}
        //                     userName={user.username}
        //                 />
        //                 <Text text={formatDateString(createdAt)} size="s" />
        //             </HStack>
        //         </VStack>
        //         <Text title={title} bold data-testid="ArticleListItem.Title" />
        //
        //         {!subtitleLink && <Text title={subtitleText} withTags />}
        //         {subtitleLink && (
        //             <VStack gap="4">
        //                 <Text text={subtitleText} withTags />
        //                 <Text text={truncatedLink} size="s" withTags />
        //             </VStack>
        //         )}
        //
        //         <AppImage
        //             fallback={
        //                 <Skeleton
        //                     width="100%"
        //                     height={250}
        //                     className={cls.img}
        //                 />
        //             }
        //             src={img}
        //             className={cls.img}
        //             alt={title}
        //             errorFallback={
        //                 <Icon Svg={DefaultImage} width="200px" height="200px" />
        //             }
        //         />
        //         {textBlock?.paragraphs && (
        //             <ArticleTextBlockComponent block={textBlock} withTags />
        //         )}
        //         <HStack justify="between" max>
        //             <AppLink to={getRouteArticleDetails(id)}>
        //                 <Button variant="outline" onClick={handleClick}>
        //                     {t('Читати більше')}
        //                 </Button>
        //             </AppLink>
        //             <ArticleViews views={views} />
        //         </HStack>
        //     </Card>
        // </div>
    );
});
