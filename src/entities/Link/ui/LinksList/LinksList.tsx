import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/common/Stack';

import { LinkCard } from '../LinkCard/LinkCard';
import { Link } from '../../model/types/link';
import { Each } from '@/shared/lib/components/Each/Each';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { LinksListError } from './LinksListError/LinksListError';
import { LinksListSkeleton } from './LinkCardSkeleton/LinksListSkeleton';

interface LinksListProps {
    className?: string;
    links?: Link[];
    isLoading?: boolean;
    error?: string;
    deleteLink: (linkId: string) => Promise<any>;
    updateLink: (updatedLink: Link) => Promise<any>;
}

export const LinksList = memo((props: LinksListProps) => {
    const { deleteLink, updateLink, error, isLoading, links, className } =
        props;

    const { t } = useTranslation('articles');
    const noCommentsMessage = t('Доданих посилань немає');

    if (isLoading) {
        return <LinksListSkeleton />;
    }
    if (error) {
        return <LinksListError className={className} />;
    }

    return (
        <VStack gap="24" max align="center">
            {links?.length ? (
                <Each
                    of={links}
                    render={(item, index) => (
                        <LinkCard
                            key={item.id}
                            link={item}
                            index={index + 1}
                            deleteLink={deleteLink}
                            updateLink={updateLink}
                        />
                    )}
                />
            ) : (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={noCommentsMessage} />}
                    off={<TextDeprecated text={noCommentsMessage} />}
                />
            )}
        </VStack>
    );
});
