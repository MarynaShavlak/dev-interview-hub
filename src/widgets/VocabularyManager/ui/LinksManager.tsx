import React, { memo, useCallback } from 'react';

import { VStack } from '@/shared/ui/common/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addLinkThunk } from '../model/services/addLinkThunk/addLinkThunk';

import { useUserAuthData } from '@/entities/User';

import { deleteLinkThunk } from '../model/services/deleteLinkThunk/deleteLinkThunk';
import { updateLinkThunk } from '../model/services/updateLinkThunk/updateLinkThunk';
import { Link, LinksList, AddLinkForm } from '@/entities/Link';
import { useLinksByUser } from '../api/linksManagerApi';

export const LinksManager = memo(() => {
    const dispatch = useAppDispatch();
    const user = useUserAuthData();

    const onAddLink = useCallback(
        (text: string, label: string) => {
            dispatch(addLinkThunk({ text, label }));
        },
        [dispatch],
    );

    const { data: links, isLoading, error } = useLinksByUser(user?.id || '');

    const handleDeleteLink = async (linkId: string) => {
        try {
            const deletedLinkId = await dispatch(
                deleteLinkThunk(linkId),
            ).unwrap();

            return deletedLinkId;
        } catch (error) {
            console.error('Error deleting link:', error);
            return null;
        }
    };

    const handleUpdateLink = async (link: Link) => {
        try {
            const updatedLink = await dispatch(updateLinkThunk(link)).unwrap();

            return updatedLink;
        } catch (error) {
            console.error('Error updating link:', error);
            return null;
        }
    };

    return (
        <VStack gap="16" max>
            <AddLinkForm onAddLink={onAddLink} />

            {error ? (
                <LinksList
                    isLoading={false}
                    links={undefined}
                    error={error as string}
                    deleteLink={handleDeleteLink}
                    updateLink={handleUpdateLink}
                />
            ) : (
                <LinksList
                    links={links}
                    isLoading={isLoading}
                    error={error as string}
                    deleteLink={handleDeleteLink}
                    updateLink={handleUpdateLink}
                />
            )}
        </VStack>
    );
});
